var express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
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

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  console.log('id: ', id);
  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo
    .findById(id)
    .then((todo) => {
      if (!todo) {
        return res.status(404).send();
      }
      res.status(200).send({ todo });
    })
    .catch((err) => {
      res.status(400).send();
    })
});

app.listen(PORT, () => {
  console.log(`app is listening on the port ${PORT}`);
});

module.exports = { app };
