const { MongoClient, ObjectID } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017/TodoApp';
// Use connect method to connect to the Server
MongoClient.connect(url, (err, db) => {
  if (err) {
    return console.log('Unable to connect to mongo servers');
  }

  // db.collection('Users').deleteMany({ name: 'Marek' }).then((result) => {
  //   console.log('result: ', result);
  // }, (err) => {
  //   console.log('error occured during deleting data');
  // });

  // db.collection('Users').deleteOne({ name: 'Billy' }).then((result) => {
  //   console.log('result: ', result);
  // }, (err) => {
  //   console.log('error occured during deleting data');
  // });

  db.collection('Users').findOneAndDelete({ _id: new ObjectID('5a2437d114c586d7ad2c8541') })
    .then(result => {
      // console.log('result: ', result);
      console.log('result: ', JSON.stringify(result, undefined, 2));
    })
    .catch(err => {
      console.log('error: ', err);
    })
  
  // db.close();
});
