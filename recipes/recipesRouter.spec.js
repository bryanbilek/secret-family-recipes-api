const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

let token;

beforeAll(async () => {
    const regRes = await request(server)
        .post('/api/auth/register')
        .send({ username: 'lebron', password: 'lebron' })
    const res = await request(server)
        .post('/api/auth/login')
        .send({ username: 'lebron', password: 'lebron' })
        token = res.body.token;
});

describe('server/recipesRouter', function () {

    test('should run the test', function () {
        expect(true).toBe(true);
    });

})

describe('GET /recipes', () => {
    test('should return 200 status', async () => {
        const res = await request(server)
            .get('/api/recipes')
            .set('Authorization', token);
        expect(res.status).toBe(200);
    })

    test('should return 400 status w/out an authorization first', async () => {
        const res = await request(server)
            .get('/api/recipes/1')
        expect(res.status).toBe(400);
    })
})

    describe('POST /recipes/add_recipe', () => {
        test('should return 201 status', async () => {
            const res = await request(server)
            .post('/api/recipes/add_recipe')
            .send({
                user_id: 1,
                recipe_name: "bake cookies",
                description: "learn how to make great cookies",
                prep_time: "7 minutes",
                cook_time: "8 minutes",
                serving_size: "4 people",
                image_url: null
            })
            .set('Authorization', token)
            expect(res.status).toBe(201);
        })
    })

    describe('POST /recipes/add_steps', () => {
        test('should return 201 status', async () => {
            const res = await request(server)
            .post('/api/recipes/add_steps')
            .send({ step_number: 1,
                 instructions: 'Preheat oven to 350 degrees',
                 recipe_id: 1 })
            .set('Authorization', token)
            expect(res.status).toBe(201);
        })
    })
