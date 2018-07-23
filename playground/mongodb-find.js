//const MongoClient = require('mongodb').MongoClient; s.u.
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err){
      return console.log('Unable to connect to MongoDB-Server');
    }
    console.log('Connected to MongoDB Server');
const db = client.db('TodoApp');

// db.collection('Todos').find({
//   _id: new ObjectID('5b5579dfc40ab0a92e9bce8a')
// }).toArray().then((docs) => {
//     console.log('Todos');
//     console.log(JSON.stringify(docs,undefined,2));
// }, (err) => {
//     console.log('Unable to fetch data.',err);
// });


// db.collection('Todos').find({
//
// }).count().then((count) => {
//     console.log(`Todos count: ${count}`);
// }, (err) => {
//     console.log('Unable to fetch data.',err);
// });

db.collection('Users').find({
  name: 'Torsten'
}).toArray().then((docs) => {
    console.log('Users with name Torsten');
    console.log(JSON.stringify(docs,undefined,2));
}, (err) => {
    console.log('Unable to fetch data.',err);
});




     //client.close();
});
