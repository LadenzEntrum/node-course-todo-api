//const MongoClient = require('mongodb').MongoClient; s.u.
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err){
      return console.log('Unable to connect to MongoDB-Server');
    }
    console.log('Connected to MongoDB Server');
const db = client.db('TodoApp');


db.collection('Users').deleteMany({name: 'Torsten'}).then( (result) => {
  console.log(result);
});

//deleteOne
// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( (result) => {
//   console.log(result);
// });

//findOneAndDelete
db.collection('Users').findOneAndDelete({_id:new ObjectID('5b54f4fee8821f4798ba329c')}).then( (result) => {
  console.log(result);
});




     //client.close();
});
