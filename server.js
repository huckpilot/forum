//This is my... FORUM! dum dum YUM!...

// Get access to the sqlite3 module
var sqlite3 = require("sqlite3");

// Specify the database you are using in this project
var db = new sqlite3.Database('forum.db');

// This allows me to make the app
var express = require("express");
var app = express();

// Ejs Sets the templeting engine
var ejs = require("ejs");
app.set("view engine", "ejs");

// Body-parser allows me to parse through a body
var bodyParser = require("body-parser");
// Tells app which method to use while parsing
app.use(bodyParser.urlencoded({
  extended: false
}))

// allows for method-override
var methodOverride = require("method-override");
// Tells app which override method to use
app.use(methodOverride("_method"))

// require marked
var marked = require('marked');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
});

// Sendgrid action
var sendgrid  = require('sendgrid')("huckpilot", "Important1nes1");



////////////////////////////////////////////////
// This redirects to /forum
app.get("/", function(req, res) {
  res.redirect("/forum")
});

////////////////////////////////////////////////
// This page is going to show all posts and all categories
app.get("/forum", function(req, res) {
  if(req.query.offset === undefined) { req.query.offset = 0; }
  db.all("SELECT posts.title, posts.body, posts.id, category_id FROM posts LIMIT 4 OFFSET ?", req.query.offset, function(err, data1) {
    //console.log(data1)
    db.all("SELECT categories.title, categories.id FROM categories", function(err, data2) {
      //console.log(data2)
      res.render("index.ejs", {
        pTitles: data1,
        cTitles: data2,
        paginationUp: parseInt(req.query.offset) + 4,
        paginationDwn: parseInt(req.query.offset) - 4,
      })
    });
  });
});

////////////////////////////////////////////////
// This page will show all categories
app.get("/categories", function(req, res) {
  db.all("SELECT categories.title, categories.brief, categories.id FROM categories", function(err, data) {
    res.render("showcategories.ejs", {
      categories: data
    })
  });
});

////////////////////////////////////////////////
// Serve up a new page to create category
app.get("/categories/new", function(req, res) {
  res.render("addcategory.ejs")
});

////////////////////////////////////////////////
// Add the new category to your categories page
app.post("/categories", function(req, res) {
  db.run("INSERT INTO categories (title, brief, image) VALUES(?, ?, ?)", req.body.title, req.body.brief, req.body.image, function(err) {
    res.redirect("/categories")
  });
});

////////////////////////////////////////////////
// Add email to subscriptions table and redirect to the specified category and id
app.post("/subscriptions", function(req, res){
  db.run("INSERT INTO subscriptions (email) VALUES (?)", req.body.email, function(err){
    res.redirect("/category/"+ req.body.category_id)
  });
});

////////////////////////////////////////////////
// Serve up a new page to create post
app.get("/category/:id/newpost", function(req, res) {
  db.all("SELECT * FROM categories WHERE id = ?", req.params.id, function(err, data) {
    // req.params id here is the id associated with the category
    //console.log(data)
    res.render("addpost.ejs", {
      categoryId: data
    })
  })
})

////////////////////////////////////////////////
// Add the new post to your category page and email it to myself. Look at sendgrid2 branch to see my attempt at pulling emails from subscriptions table(unsuccessful so far)
app.post("/category/:id", function(req, res) {
  db.run("INSERT INTO posts (title, body, image, category_id) VALUES(?, ?, ?, ?)", req.body.title, req.body.body, req.body.image, req.params.id, function(err) {
    var email     = new sendgrid.Email({
  to:       'huckpilot@gmail.com',
  from:     'huckpilot@gmail.com',
  subject:  req.body.title,
  text:     req.body.body
});
sendgrid.send(email, function(err, json) {
  if (err) { return console.error(err); }
  console.log(json);
});
    res.redirect("/category/" + req.params.id)
  });

});


////////////////////////////////////////////////
// Show individual post
app.get("/category/:categoryid/post/:id", function(req, res) {
  db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data1) {
      var markdownArr = []
      // console.log(data1)
        for (i in data1){
        markdownArr.push(data1.body)
        }
      // console.log(markdownArr)
      var mark = markdownArr[0]
      var marky = marked(mark)
    //console.log(data1)
    db.all("SELECT comments.user_id, comments.body FROM comments WHERE post_id = ?", req.params.id, function(err, data2) {
      if (err) throw (err);
      res.render("showPost.ejs", {
        thisPost: data1,
        comments: data2,
        marky: marky,
      })
    });
  });
});

////////////////////////////////////////////////
// This will add the comment made on the showPost to the database
app.post("/category/:categoryid/post/:id/comments", function(req, res) {
  db.run("INSERT INTO comments (post_id, body) VALUES (?, ?)", req.params.id, req.body.body, function(err) {
    res.redirect("/category/" + req.params.categoryid + "/post/" + req.params.id)
  });
});

//////////////////////////////////////////////
// This is where I increase/decrease my up/down vote counter
app.put("/category/:categoryid/post/:id/vote", function(req, res) {
  db.get("SELECT posts.vote FROM posts WHERE posts.id = ?", req.params.id, function(err, data1) {
    var voter = data1.vote;
    //console.log(voter)
    if (req.body.vote === "up") {
      var votes = voter + 1;
      //console.log(votes)
      db.run("UPDATE posts SET vote = ? WHERE id = ?", votes, req.params.id, function(err) {
        res.redirect("/category/" + req.params.categoryid + "/post/" + req.params.id)
      });
    } 
    else {
      var votes = voter - 1;
      db.run("UPDATE posts SET vote = ? WHERE id = ?", votes, req.params.id, function(err) {
        res.redirect("/category/" + req.params.categoryid + "/post/" + req.params.id)
      });
    }
  });
});

////////////////////////////////////////////////
// Show individual category
app.get("/category/:id", function(req, res) {
  db.get("SELECT categories.title, categories.id FROM categories WHERE id = ?", req.params.id, function(err, data1) {
    db.all("SELECT posts.title, posts.id FROM posts WHERE category_id = ?", req.params.id, function(err, data2) {
      res.render("showcategory.ejs", {
        thisCategory: data1,
        posts: data2,
        err: ""
      })
    });
  });
});

////////////////////////////////////////////////
// Delete a post
app.delete("/post/:id", function(req, res) {
  db.run("DELETE FROM posts WHERE id = ?", req.params.id, function(err) {
    res.redirect("/forum");
  })
})

////////////////////////////////////////////////
// IF there are no posts in a category, delete category is enabled.
app.delete("/category/:id", function(req, res) {
  db.all("SELECT * FROM posts WHERE category_id = ?", req.params.id, function(err, data) {
    if (data.length === 0) {
      db.run("DELETE FROM categories WHERE id = ?", req.params.id, function(err) {
        res.redirect("/categories")
      })
    } else {
      db.get("SELECT categories.title, categories.id FROM categories WHERE id = ?", req.params.id, function(err, data1) {
        db.all("SELECT posts.title, posts.id FROM posts WHERE category_id = ?", req.params.id, function(err, data2) {
          res.render("showcategory.ejs", {
            thisCategory: data1,
            posts: data2,
            err: "Cannot delete categories with posts"
          })
        });
      });
    }
  });
});


////////////////////////////////////////////////
//This closes out th server and listens for the post
app.listen(3000);
console.log("Listening on port 3000")