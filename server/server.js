var express = require('express');
var bodyParser = require('body-parser');
var { mongoose } = require('./db/mongoose');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todoExample = new Todo({
    text: req.body.text
  });

  todoExample
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
  Todo
    .find()
    .then((todos) => {
      res.send({ todos });
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`app is listening on the port ${PORT}`);
});

module.exports = { app };
