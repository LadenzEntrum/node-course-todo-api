//const MongoClient = require('mongodb').MongoClient; s.u.
const {MongoClient, ObjectID} = require('mongodb');

// var obj = new ObjectID();
// console.log(obj);


// var user = {name: 'Torsten', age:41};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err,client) => {
    if (err){
      return console.log('Unable to connect to MongoDB-Server');
    }
    console.log('Connected to MongoDB Server');
    const db = client.db('TodoApp');

    // db.collection('Todos').insertOne({
    //   text: 'someting to do',
    //   completed:false
    // },(err, result) => {
    //   if(err){
    //     return console.log('Unable to insert todo', err);
    //   }
    //
    //   console.log(JSON.stringify(result.ops, undefined,2));
    //
    // });


    //insert new doc into users( name, age, location)
    //add a collection

//     db.collection('Users').insertOne({
//       name: 'Torsten',
//       age:41,
//       location: 'munich'
//     },(err, result) => {
//       if(err){
//         return console.log('Unable to insert user(s)', err);
//       }
//
//       console.log(result.ops[0]._id.getTimestamp());
//
//     });
//
     client.close();
});
