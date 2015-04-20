DROP TABLE IF EXISTS categories;
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  title TEXT, user_id INT, brief TEXT, image TEXT, vote INT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update_categories BEFORE UPDATE ON categories BEGIN
  UPDATE categories SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

-- ////////////

DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id INTEGER PRIMARY KEY,
  title TEXT, body TEXT, image TEXT, user_id INT, category_id INT, vote INT, expiration INT, 
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update_posts BEFORE UPDATE ON posts BEGIN
  UPDATE posts SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

-- ////////////

DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
  id INTEGER PRIMARY KEY,
  user_id INT, post_id INT, vote INT, body TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update_comments BEFORE UPDATE ON comments BEGIN
  UPDATE comments SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

-- ////////////

DROP TABLE IF EXISTS users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email TEXT, username TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update_users BEFORE UPDATE ON users BEGIN
  UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;

-- ////////////

DROP TABLE IF EXISTS subscriptions;
CREATE TABLE subscriptions (
  id INTEGER PRIMARY KEY,
  email TEXT, category_id INT, post_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER timestamp_update_subscriptions BEFORE UPDATE ON subscriptions BEGIN
  UPDATE subscriptions SET updated_at = CURRENT_TIMESTAMP WHERE id = new.id;
END;