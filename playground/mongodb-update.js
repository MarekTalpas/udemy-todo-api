const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo servers');
  }

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a23f350008a8f0523bcc30d')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // })
  // .then(result => {
  //   console.log('Result: ', JSON.stringify(result, undefined, 2));
  // });

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a2402526b88390733a068ba')
  }, {
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  })
  .then(result => {
    console.log('result: ', JSON.stringify(result, undefined, 2));
  });
  
  // db.close();
});
