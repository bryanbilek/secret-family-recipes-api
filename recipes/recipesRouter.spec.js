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
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)
            .post('/api/recipes/add_steps')
            .send({ step_number: 1,
                 instructions: 'Preheat oven to 350 degrees',
                 recipe_id: 1 })
            expect(res.status).toBe(400);
        })
    })

    describe('POST /recipes/add_ingrediant', () => {
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)
            .post('/api/recipes/add_ingrediant')
            .send({ ingrediant_name: 'Buns', quantity: '6 buns', recipe_id: 2 })
            expect(res.status).toBe(400);
        })
    })

    describe('POST /recipes/add_fav', () => {
        test('should return 500 status w/out sending anything', async () => {
            const res = await request(server)
            .post('/api/recipes/add_fav')
            .set('Authorization', token)
            expect(res.status).toBe(500);
        })
    })

    describe('PUT /recipes/recipes/:id', () => {
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)    
            .put('/api/recipes/1')
            .send({
                user_id: 1,
                recipe_name: "bake cookies555",
                description: "learn how to make great cookies",
                prep_time: "7 minutes",
                cook_time: "8 minutes",
                serving_size: "4 people",
                image_url: null
            })
            expect(res.status).toBe(400);
        })
    })

    describe('PUT /recipes/recipes/edit_steps/:id', () => {
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)    
            .put('/api/recipes/edit_steps/1')
            .send({ step_number: 1,
                instructions: 'Preheat oven to 350 degrees',
                recipe_id: 1 })
            expect(res.status).toBe(400);
        })
    })

    describe('PUT /recipes/recipes/edit_ingrediants/:id', () => {
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)    
            .put('/api/recipes/edit_ingrediants/1')
            .send({ ingrediant_name: 'Buns', quantity: '6 buns', recipe_id: 2 })
            expect(res.status).toBe(400);
        })
    })

    describe('DELETE /recipes/recipes/:id', () => {
        test('should return 400 status w/out authorization', async () => {
            const res = await request(server)    
            .delete('/api/recipes/1')
            expect(res.status).toBe(400);
        })
    })

    describe('DELETE /recipes/recipes/delete_step/:id', () => {
        test('should return 404 status w/out id defined', async () => {
            const res = await request(server)    
            .delete('/api/delete_step/1')
            .set('Authorization', token)
            expect(res.status).toBe(404);
        })
    })
    
    describe('DELETE /recipes/recipes/delete_ingrediant/:id', () => {
        test('should return 404 status w/out id defined', async () => {
            const res = await request(server)    
            .delete('/api/delete_ingrediant/1')
            .set('Authorization', token)
            expect(res.status).toBe(404);
        })
    })