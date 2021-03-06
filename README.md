# forum
## This is a forum I am creating using CRUD

![Mockup](/images/seeder.jpg?raw=true "Mockup")

### A forum that will allow users to:
* create a new category and add a description to it (think subreddits on reddit)
* create a new forum post in a given category (/categories/category-name/posts/new)
* delete a category if there are no posts associated with it
* show (ie, see) a given forum post
* see all of the forum's posts as a feed, up to a maximum of ten (/posts)
* browse successive pages of ten posts each, until the beginning of the feed (/posts?id=id-of-first-post)
* write a forum post as markdown and have it rendered as HTML
* browse forum posts by category
* "upvote" a forum post
* "upvote" a category
* see the "vote totals" of a given forum post or category
* "downvote" a forum post or category
* add a time-to-live to a forum post, so that it expires after a given period
* see, but not interact with, an expired post
* subscribe to a category or post and receive updates to it via email (using Sendgrid)

### I use the sendGrid api to send users emails with updates from the forum
(https://sendgrid.com/docs/API_Reference/index.html "SendGrid Api")

![Diagram](/images/diagram.jpg?raw=true "Diagram")

### ERD
#### This entity relationship diagram between the category and post and the post and comment
* There can be multiple posts to one category but there may only be one category for a post
* There can be multiple comments to one post but there may only be one post for a comment.

![ERD](/images/ERD.jpg?raw=true "ERD")