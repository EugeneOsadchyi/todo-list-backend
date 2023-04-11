import { describe, it } from 'node:test';
import { strict as assert } from 'node:assert';

import request from 'supertest';
import app from '../../src/app';

describe('GET /', () => {
  it('should return 200 OK', async () => {
    const response = await request(app).get('/');

    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.text, 'Hello World!');
  });
})
