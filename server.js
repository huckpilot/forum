//This is my... FORUM! dum dum dum!...

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



// This redirects to /forum
app.get("/", function(req, res) {
  res.redirect("/forum")
});

// This page is going to show all posts and all categories
app.get("/forum", function(req, res) {
  db.all("SELECT posts.title, posts.id FROM posts", function(err, data1) {
    db.all("SELECT categories.title, categories.id FROM categories", function(err, data2) {
      res.render("index.ejs", {pTitles: data1, cTitles: data2})
    });
  });
});

// This page will show all categories
app.get("/categories", function(req, res){
  db.all("SELECT categories.title, categories.brief, categories.id FROM categories", function(err, data){
    res.render("showCategories.ejs", {categories: data})
  });
});

// Serve up a new page to create category
app.get("/categories/new", function(req, res){
  res.render("addcategory.ejs")
});

// Add the new category to your category page
app.post("/categories", function(req, res){
  db.run("INSERT INTO categories (title, brief, image) VALUES(?, ?, ?)", req.body.title, req.body.brief, req.body.image, function(err){
    res.redirect("/categories")
  });
});

// Show individual post
app.get("/post/:id", function(req, res){
  db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data){
    res.render("showPost.ejs", {thisPost: data})
  });
});

// Show individual category
app.get("/categories/:id", function(req, res){
  db.all("SELECT posts.title AS post_title, posts.id, categories.title AS category_title FROM posts INNER JOIN categories ON posts.category_id = categories.id WHERE categories.id = ?", req.params.id, function(err, data){
    console.log(data);
    res.render("showCategory.ejs", {thisCategory: data})
  });
});











//This closes out th server and listens for the post
app.listen(3000);
console.log("Listening on port 3000")