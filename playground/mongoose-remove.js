const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then((result) => {
//   console.log(result);
// });

// Todo.findOneAndRemove returns the deleted item unlike remove
// Todo.findByIdAndRemove

Todo.findOneAndRemove({_id: '5b5d8ef217e69eb8e36e6e15'}).then((todo) => {
  console.log(todo);
});


Todo.findByIdAndRemove('5b5d8ef217e69eb8e36e6e15').then((todo) => {
  console.log(todo);
});
