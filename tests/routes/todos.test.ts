import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';
import request from 'supertest';
import app from '../../src/app';

describe('GET /todos', () => {
  it('should return a list of todos', async () => {
    const response = await request(app).get('/todos');

    assert.strictEqual(response.statusCode, 200);
    assert.deepStrictEqual(response.body, []);
  });
});

describe('POST /todos', () => {
  it('should create a todo', async () => {
    const response = await request(app).post('/todos').send({ title: 'Make a todo list' });

    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.title, 'Make a todo list');
  });

  it('should return an error if "title" is missing', async () => {
    const response = await request(app).post('/todos').send({});

    assert.strictEqual(response.statusCode, 400);
    assert.strictEqual(response.body.error, '"title" property is required');
  });
});

describe('GET /todos/:id', () => {
  it('should return a todo', async () => {
    const response = await request(app).get('/todos/1');

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.title, 'Make a todo list');
  });

  it('should return an error if the todo does not exist', async () => {
    const response = await request(app).get('/todos/2');

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, 'Not found');
  });
});

describe('PUT /todos/:id', () => {
  it('should update a todo', async () => {
    const response = await request(app).put('/todos/1').send({ title: 'Make a todo list with tests' });

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.title, 'Make a todo list with tests');
  });

  it('should return an error if the todo does not exist', async () => {
    const response = await request(app).put('/todos/2').send({ title: 'Make a todo list with tests' });

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, 'Not found');
  });
});


describe('DELETE /todos/:id', () => {
  it('should delete a todo', async () => {
    const response = await request(app).delete('/todos/1');

    assert.strictEqual(response.statusCode, 204);
  });

  it('should return an error if the todo does not exist', async () => {
    const response = await request(app).delete('/todos/2');

    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(response.body.error, 'Not found');
  });
});
