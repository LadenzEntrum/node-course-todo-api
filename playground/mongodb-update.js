//const MongoClient = require('mongodb').MongoClient; s.u.
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err){
      return console.log('Unable to connect to MongoDB-Server');
    }
    console.log('Connected to MongoDB Server');
const db = client.db('TodoApp');

// db.collection('Todos').findOneAndUpdate({
//   _id: new ObjectID('5b5593d3c40ab0a92e9bd61d')
// },{
//   $set: {completed: true}
// },{returnOriginal:false
// }).then( (result) => {
//   console.log(result);
// });

db.collection('Users').findOneAndUpdate({
  _id: new ObjectID('5b54f4117b99cf3670112476')
},{
  $set: {name: 'Torsten'},
   $inc: { age: 1}
},{returnOriginal:false
}).then( (result) => {
  console.log(result);
});


     //client.close();
});
