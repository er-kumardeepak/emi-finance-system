const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { once } = require('node:events');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-secret';
process.env.JWT_EXPIRE = process.env.JWT_EXPIRE || '1h';
process.env.MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/crediflow-finance';

const app = require('../app');

test('GET /api/customers returns showcase data when MongoDB is unavailable', async () => {
  const server = app.listen(0);
  await once(server, 'listening');

  try {
    const port = server.address().port;
    const token = jwt.sign({ id: 'demo-admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = await fetch(`http://127.0.0.1:${port}/api/customers`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    assert.equal(response.status, 200);
    const body = await response.json();
    assert.ok(Array.isArray(body));
    assert.ok(body.length >= 8);
    assert.ok(body.some((customer) => customer.fullName === 'Ananya Sharma'));
  } finally {
    server.close();
  }
});
