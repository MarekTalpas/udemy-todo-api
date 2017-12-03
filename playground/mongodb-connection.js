const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo servers');
  }
  // db.collection('Todos').insertOne({
  //   text: 'learn to work with mongodb',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert Todos colletion');
  //   }
  //   console.log('result: ', JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Bruce Willis',
  //   age: 57,
  //   location: 'California'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('unable to insert Users collection');
  //   }
  //   console.log('result: ', JSON.stringify(result.ops, undefined, 2));
  // });

  db.collection('Users').find({ name: 'Marek' }).toArray().then((docs) => {
    console.log('found results: ');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('error when looking for results.');
  });
  
  db.close();
});
