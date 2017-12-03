const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo servers');
  }

  db.collection('Users').find({ name: 'Marek' }).toArray().then((docs) => {
    console.log('found results: ');
    console.log(JSON.stringify(docs, undefined, 2));
  }, (err) => {
    console.log('error when looking for results.');
  });
  
  db.close();
});
