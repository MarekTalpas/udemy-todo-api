const request = require('supertest');
const expect = require('expect');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

beforeEach((done) => {
  Todo
    .remove({})
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
          .find()
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
            expect(todos.length).toBe(0);
            done();
          })
          .catch((err) => done(err));
      });
  });
});