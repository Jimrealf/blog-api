const request = require('supertest');
const app = require('../server');
const pool = require('../db');

describe('Post API', () => {
    let token;
    beforeEach(async () => {
        await pool.query('DELETE FROM posts');
        await pool.query('DELETE FROM users');
        await request(app).post('/api/users/register').send({
            username: 'testuser',
            password: 'testpass',
            email: 'test@example.com',
        });
        const res = await request(app).post('/api/users/login').send({
            username: 'testuser',
            password: 'testpass',
        });
        token = res.body.token;
    });
    afterAll(() => pool.end());

    test('GET /api/posts lists published posts', async () => {
        await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'Public', content: 'Hi', published: true });
        const res = await request(app).get('/api/posts');
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });

    test('POST /api/posts creates with token', async () => {
        const res = await request(app)
            .post('/api/posts')
            .set('Authorization', `Bearer ${token}`)
            .send({ title: 'New', content: 'Post', published: true });
        expect(res.status).toBe(201);
        expect(res.body.title).toBe('New');
    });
});
