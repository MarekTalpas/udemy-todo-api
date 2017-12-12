const { ObjectID } = require('mongodb');
const request = require('supertest');
const expect = require('expect');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const testTodos = [{
  _id: new ObjectID(),
  text: 'test todo 1'
}, {
  _id: new ObjectID(),
  text: 'test todo 2'
}, {
  _id: new ObjectID(),
  text: 'test todo 3'
}];

beforeEach((done) => {
  Todo
    .remove({})
    .then(() => {
      return Todo.insertMany(testTodos);
    })
    .then(() => done());
});

describe('POST /todos', () => {
  it('should create todo request', (done) => {
    var text = 'test todo';

    request(app)
      .post('/todos')
      .send({ text })
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }
        Todo
          .find({ text })
          .then((todos) => {
            expect(todos.length).toBe(1);
            expect(todos[0].text).toBe(text);
            done();
          })
        .catch((err) => done(err));
      });
  });

  it('should not create todo request when input is invalid', (done) => {
    request(app)
      .post('/todos', (req, res) => {
        req.send({});
      })
      .expect(400)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo
          .find()
          .then((todos) => {
            expect(todos.length).toBe(3);
            done();
          })
          .catch((err) => done(err));
      });
  });
});

describe('GET /todos', (done) => {
  it('should get all todos', () => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(3);
      })
      .end(done);
  });
});

describe('GET /todos/:id', (done) => {
  it('should get correct todo by ID', () => {
    request(app)
      .get(`todos/${testTodos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(testTodos[0].text);
      })
      .end(done);
  });

  it('should get 404 when id is valid bot does not match with any todo', () => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`todos/${id}`)
      .expect(404)
      .end(done)
  });

  it('should get 404 when id is not valid', () => {
    const id = '123abc';
    request(app)
      .get(`todos/${id}`)
      .expect(404)
      .end(done)
  });

});

describe('DELETE /todos/:id', () => {
  it('should delete todo by id', (done) => {
    var hexId = testTodos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(hexId)
          .then((todo) => {
            expect(todo).toNotExist();
            done();
          })
          .catch((err) => done(err));
      });
  });
  it('should return 404 when todo does not exist', (done) => {
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  });
  it('should return 404 when object id is invalid', (done) => {
    const id = '123abc';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  });
});
