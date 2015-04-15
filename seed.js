var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('forum.db');
db.run("INSERT INTO categories (title, user_id, brief, image) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
  'Dogs', 1, 'about dogs', 'http://placehold.it/200',
  'Cats', 2, 'about cats', 'http://placehold.it/200',
  'Cars', 3, 'about cars', 'http://placehold.it/200',
  'Travel', 4, 'about travel', 'http://placehold.it/200',
  function(err) {
    if (err) {
      throw err;
    }
  }
);

////////////

db.run("INSERT INTO posts (title, body, image, user_id, category_id, vote, expiration) VALUES (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?), (?, ?, ?, ?, ?, ?, ?)",
  'Droopy derp dog', 'such a droopy dog.', 'http://placehold.it/200', 1, 1, 10, 06102015,
  'Big dog', 'biggest dog ever', 'http://placehold.it/200', 2, 1, 08, 06102015,
  'best way to groom a dog?', 'I have a long haired dog..', 'http://placehold.it/200', 3, 1, 05, 06102015,
  'Cute cat', 'The cutest eva', 'http://placehold.it/200', 4, 2, 11, 06102015,
  'Big Cat', 'biggest cat you have ever seen!', 'http://placehold.it/200', 5, 2, 2, 06102015,
  'If I fits I sits', 'Cats are liquid.', 'http://placehold.it/200', 6, 2, 22, 06102015,
  function(err) {
    if (err) {
      throw err;
    }
  }
);

////////////

db.run("INSERT INTO comments (user_id, post_id, vote, body) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)",
  1, 1, 3, 'This is an adorable dog',
  2, 2, 7, 'Woah, is that even real?',
  3, 3, 2, 'There is no helping that dog.',
  function(err) {
    if (err) {
      throw err;
    }
  }
);

////////////

db.run("INSERT INTO users (email, username) VALUES (?, ?), (?, ?), (?, ?)",
  'dogfan22@yahoo.com', 'dogfan22',
  'notarobot@gmail.com', 'robotUserrr',
  'jussdogz@gmail.com', 'justDogz',
  function(err) {
    if (err) {
      throw err;
    }
  }
);

////////////

db.run("INSERT INTO subscriptions (user_id, category_id, post_id) VALUES (?, ?, ?), (?, ?, ?), (?, ?, ?)",
  1, 1, 1,
  2, 1, 1,
  3, 1, 1,
  function(err) {
    if (err) {
      throw err;
    }
  }
);




