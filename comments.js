// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Create an object to store comments
const commentsByPostId = {};

// Create an endpoint to handle comment creation
app.post('/posts/:id/comments', async (req, res) => {
  // Get the id from the url
  const postId = req.params.id;

  // Get the comment from the request body
  const { content } = req.body;

  // Get the comments from the object
  const comments = commentsByPostId[postId] || [];

  // Create a new comment
  const comment = { id: comments.length + 1, content };

  // Add the new comment to the comments object
  comments.push(comment);
  commentsByPostId[postId] = comments;

  // Send the response
  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: {
      ...comment,
      postId,
    },
  });

  res.status(201).send(comments);
});

// Create an endpoint to handle comment listing
app.get('/posts/:id/comments', (req, res) => {
  // Get the id from the url
  const postId = req.params.id;

  // Get the comments from the object
  const comments = commentsByPostId[postId] || [];

  // Send the response
  res.send(comments);
});

// Create an endpoint to handle event creation
app.post('/events', (req, res) => {
  console.log('Event Received:', req.body.type);

  res.send({});
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});