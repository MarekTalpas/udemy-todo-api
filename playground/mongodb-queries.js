const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// const todoId = '5a28645c60c77b0706c5efc1';
const userId = '5a26be7d787bbc0a828893d4';

// id form is not valid
if (!ObjectID.isValid(userId)){
  console.log('ID is not valid');
}

// Todo
//   .find({
//     _id: todoId
//   })
//   .then((todos) => {
//     if (!todos) {
//       return console.log('todos not found');
//     }
//     console.log('todos: ', todos);
//   });

// Todo
//   .findOne({
//     _id: todoId
//   })
//   .then((todo) => {
//     if (!todo) {
//       return console.log('todo not found');
//     }
//     console.log('todo: ', todo);
//   });

// Todo
//   .findById(todoId)
//   .then((todo) => {
//     if (!todo) {
//       return console.log('todo not found');
//     }
//     console.log('todo: ', todo);
//   });

User
  .findById(userId)
  .then((user) => {
    if (!user) {
      // user ID is valid but it does not match with ID of any user in database
      return console.log('Unable to find user');
    }

    console.log('user: ', user);
  })
  .catch((err) => {
    console.log(err);
  });
