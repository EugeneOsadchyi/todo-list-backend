import { describe, it, before, beforeEach, afterEach, after } from 'node:test';
import { strict as assert } from 'node:assert';
import request from 'supertest';
import app from '../../src/app';
import sequelize from '../../src/models';
import User from '../../src/models/user';
import Todo from '../../src/models/todo';
import { signJwt } from '../../src/utils/jwt';

describe('Todos API', () => {
  beforeEach(() => sequelize.sync({ force: true }));
  afterEach(() => sequelize.truncate());
  after(() => sequelize.close());

  describe('GET /api/todos', () => {
    it('should fail with 401', async () => {
      const response = await request(app).get('/api/todos');

      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.error, 'Unauthorized');
    });

    it('should return a list of todos', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      let response = await request(app)
        .get('/api/todos')
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.body, []);

      const todo = await createTodo(user);

      response = await request(app)
        .get('/api/todos')
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 200);
      assert.deepStrictEqual(response.body, [
        todo.toJSON(),
      ]);

      await user.destroy();
    });
  });

  describe('POST /api/todos', () => {
    it('should fail with 401', async () => {
      const response = await request(app)
        .post('/api/todos')
        .send({ title: 'Make a todo list' });

      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.error, 'Unauthorized');
    });

    it('should create a todo', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', token)
        .send({ title: 'Make a todo list' });

      assert.strictEqual(response.statusCode, 201);
      assert.strictEqual(response.body.title, 'Make a todo list');

      await user.destroy();
    });

    it('should return an error if "title" is missing', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      const response = await request(app)
        .post('/api/todos')
        .set('Authorization', token)
        .send({});

      assert.strictEqual(response.statusCode, 400);
      assert.strictEqual(response.body.error, '"title" property is required');

      await user.destroy();
    });
  });

  describe('PUT /api/todos/:id/markTodoCompleted', () => {
    it('should fail with 401', async () => {
      const response = await request(app)
        .put('/api/todos/1/markTodoCompleted');

      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.error, 'Unauthorized');
    });

    it('should mark Todo as completed', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);
      const todo = await createTodo(user);

      const response = await request(app)
        .put(`/api/todos/${todo.id}/markTodoCompleted`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.body.completed, true);

      await user.destroy();
    });

    it('should return an error if the todo does not exist', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      const response = await request(app)
        .put(`/api/todos/1000000/markTodoCompleted`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 404);
      assert.strictEqual(response.body.error, 'Not found');

      await user.destroy();
    });
  });

  describe('PUT /api/todos/:id/markTodoUncompleted', () => {
    it('should fail with 401', async () => {
      const response = await request(app)
        .put('/api/todos/1/markTodoUncompleted');

      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.error, 'Unauthorized');
    });

    it('should mark Todo as completed', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);
      const todo = await createTodo(user);

      const response = await request(app)
        .put(`/api/todos/${todo.id}/markTodoUncompleted`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 200);
      assert.strictEqual(response.body.completed, false);

      await user.destroy();
    });

    it('should return an error if the todo does not exist', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      const response = await request(app)
        .put(`/api/todos/1000000/markTodoUncompleted`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 404);
      assert.strictEqual(response.body.error, 'Not found');

      await user.destroy();
    });
  });

  describe('DELETE /api/todos/:id', () => {
    it('should fail with 401', async () => {
      const response = await request(app)
        .delete('/api/todos/1000000')
        .send({ title: 'Make a todo list with tests' });

      assert.strictEqual(response.statusCode, 401);
      assert.strictEqual(response.body.error, 'Unauthorized');
    });

    it('should delete a todo', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);
      const todo = await createTodo(user);

      const response = await request(app)
        .delete(`/api/todos/${todo.id}`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 204);

      await user.destroy();
    });

    it('should return 204 even if the todo does not exist', async () => {
      const user = await createUser();
      const token = await signJwtForUser(user);

      const response = await request(app)
        .delete(`/api/todos/1000000`)
        .set('Authorization', token);

      assert.strictEqual(response.statusCode, 204);

      await user.destroy();
    });
  });
});

async function createUser(): Promise<User> {
  const password = await User.hashPassword('password');
  return await User.create({ name: 'John Doe', email: 'john@example.com', password });
}

async function signJwtForUser(user: User): Promise<string> {
  return signJwt({ id: user.id });
}

async function createTodo(user: User): Promise<Todo> {
  return Todo.create({ title: 'Make a todo list', userId: user.id });
}
