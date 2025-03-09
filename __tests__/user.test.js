const request = require('supertest');
const app = require('../server');
const pool = require('../db');

describe('User API', () => {
    beforeEach(async () => {
        await pool.query('DELETE FROM users');
    });
    afterAll(() => pool.end());

    test('POST /api/users/register creates a user', async () => {
        const res = await request(app).post('/api/users/register').send({
            username: 'test1',
            password: 'pass123',
            email: 'test1@example.com',
        });
        expect(res.status).toBe(201);
        expect(res.body.username).toBe('test1');
    });

    test('POST /api/users/login returns a token', async () => {
        await request(app).post('/api/users/register').send({
            username: 'test2',
            password: 'pass456',
            email: 'test2@example.com',
        });
        const res = await request(app)
            .post('/api/users/login')
            .send({ username: 'test2', password: 'pass456' });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
