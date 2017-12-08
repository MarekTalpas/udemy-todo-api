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
