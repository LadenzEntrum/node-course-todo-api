const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos,populateTodos,users,populateUsers} = require('./seed/seed.js');


beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo',(done) => {
      var text = 'Test todo text';

      request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
          expect(res.body.text).toBe(text);
        })
        .end((err,res) => {
          if (err) {
            return done(err);
          }
          Todo.find({text}).then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          }).catch((e) => done(e));
        });
  });

  it('should not write in db with invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todos', () => {
  it('should GET all todos',(done) => {

      request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
          expect(res.body.todos.length).toBe(2);
        })
        .end(done);

  });

});


describe('GET /todos:id', () => {
  it('should GET the ID todo',(done) => {

    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });

  it('should return 404 if todo not found',(done) => {


    request(app)
    .get(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 for non Object ID',(done) => {

    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('DELETE /todos:id', () => {
   it('should DELETE the todo with ID',(done) => {
     var hexId = todos[1]._id.toHexString();

     request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
          expect(res.body.todo._id).toBe(hexId);
      })
      .end((err,res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId).then((res) => {
          expect(res).toBeFalsy();
          done();
        }).catch((e) => done(e));
     });
   });

  it('should return 404 if todo not found',(done) => {

    request(app)
    .delete(`/todos/${new ObjectID().toHexString()}`)
    .expect(404)
    .end(done);
  });

  it('should return 404 if object id is invalid',(done) => {

    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH /todos:id', () => {
   it('should PATCH the todo with new text with ID and completed is true now',(done) => {
     var hexId = todos[0]._id.toHexString();
     var text = 'Text updated';

     request(app)
      .patch(`/todos/${hexId}`)
      .send({
        text: text,
        completed: true
      })
      .expect(200)
      .expect((res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(typeof res.body.todo.completedAt).toBe('number');
      })
      .end(done);
     });


     it('should PATCH the todo with new text with ID and completed false',(done) => {
       var hexId = todos[1]._id.toHexString();
       var text = 'Text updated!!';

       request(app)
        .patch(`/todos/${hexId}`)
        .send({
          text: text,
          completed: false,
          completedAt: null
        })
        .expect(200)
        .expect((res) => {
              expect(res.body.todo.text).toBe(text);
              expect(res.body.todo.completed).toBe(false);
              expect(res.body.todo.completedAt).toBeFalsy();
        })
        .end(done);
       });
});

describe('GET /users/me',() => {
  it('should return user if authenticated',(done) => {
    request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect (res.body._id).toBe(users[0]._id.toHexString());
        expect (res.body.email).toBe(users[0].email);
      })
      .end(done);

  });
  it('should return 401 if not authenticated',(done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect (res.body).toMatchObject({});
      })
      .end(done);
  });
});

describe('POST /users',() => {
  it('should create a user', (done) => {
    var email = 'tt@p.com';
    var password = 'userTestPass';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(200)
      .expect((res) => {
        expect (res.headers['x-auth']).toBeTruthy();
        expect (res.body._id).toBeTruthy();
        expect (res.body.email).toBe(email);
      })
      .end((err) => {
        if (err){
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        })
        });
      });


  it('should return validation err if request invalid ',(done) => {
    var email = 'ttpcom';
    var password = 'us';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .expect((res) => {
        expect (res.headers['x-auth']).not.toBeTruthy();
        expect (res.body._id).not.toBeTruthy();
        expect (res.body.email).not.toBe(email);
      done();
      })
      .end((err) => {
        if (err){
          return done(err);
        }

      });
  });

  it('should not create user if email in use ',(done) => {
    var email = users[0].email;
    var password = 'userTestPass';
    request(app)
      .post('/users')
      .send({email,password})
      .expect(400)
      .expect((res) => {
        expect (res.headers['x-auth']).not.toBeTruthy();
        expect (res.body._id).not.toBeTruthy();
        expect (res.body.email).not.toBe(email);
        done();
      })
      .end((err) => {
        if (err){
          return done(err);
        }
      });
  });
});
