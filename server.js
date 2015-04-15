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
    db.all("SELECT categories.title, categories.brief, categories.id FROM categories", function(err, data2) {
      res.render("index.ejs", {pTitles: data1, cTitles: data2})
    });
  });
});

// Show individual post
app.get("/post/:id", function(req, res){
  db.get("SELECT * FROM posts WHERE id = ?", req.params.id, function(err, data){
    res.render("show.ejs", {thisPost: data})
  });
});





























//This closes out th server and listens for the post
app.listen(3000);
console.log("Listening on port 3000")