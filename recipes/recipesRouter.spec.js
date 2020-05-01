const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');
const jwt = require('jsonwebtoken');
jest.mock('../middleware/restricted', () => {
    return (req, res, next) => {
        next();
    }
})

describe('server/recipesRouter', function() {
    test('should run the test', function() {
        expect(true).toBe(true);
    });

    //login before running test on restricted router
    beforeAll((done) => {
        request(server)
            .post('/api/auth/login')
            .send({ username: 'mj23', password: 'airjordan' })
            .end((err, res) => {
                token = res.body.token;
                done();
        });
    });

    describe('GET /recipes', () => {
        test('should return 200 status', async () => {
            const res = await request(server)
            .get('/api/recipes')
            .set('Authorization', token);
            expect(res.status).toBe(200);
        })
    })

    // describe('GET /recipes/:id', () => {
    //     test('should return 200 status', async () => {
    //         const res = await request(server)
    //         .get('/api/recipes/1')
    //         .set('Authorization', token)
    //         expect(res.status).toBe(200);
    //     })
    // })

    // describe('POST /recipes', () => {
    //     test('should return 201 status', async () => {
    //         const res = await request(server)
    //         .post('/api/recipes')
    //         .send({
    //             id: 1,
    //             user_id: 1,
    //             recipe_name: "bake cookies",
    //             description: "learn how to make great cookies",
    //             prep_time: "7 minutes",
    //             cook_time: "8 minutes",
    //             serving_size: "4 people",
    //             image_url: null
    //         })
    //         .set('Authorization', token)
    //         expect(res.status).toBe(201);
    //     })
    // })

})