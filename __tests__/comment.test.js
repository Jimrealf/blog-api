const request = require('supertest');
const app = require('../server');
const pool = require('../db');

describe('Comment API', () => {
    let postId;
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

    test('POST /api/comments adds a comment', async () => {
        const res = await request(app)
            .post('/api/comments')
            .send({ content: 'Love it!', post_id: postId });
        expect(res.status).toBe(201);
        expect(res.body.content).toBe('Love it!');
    });

    test('GET /api/comments/post/:postId lists comments', async () => {
        await request(app)
            .post('/api/comments')
            .send({ content: 'Great!', post_id: postId });
        const res = await request(app).get(`/api/comments/post/${postId}`);
        expect(res.status).toBe(200);
        expect(res.body.length).toBe(1);
    });
});
