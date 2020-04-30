const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe('server', function () {
    test('should run the test', function () {
        expect(true).toBe(true);
    });
});

describe('CRUD reqs for /api/recipes', function () {
    let token;
    beforeEach(async () => {
        const response = await request(server)
            .post('/api/auth/login')
            .send({ username: 'michael', password: 'jordan' })
        token = response.body.token;
        request(server)
        .post('/api/auth/login')
        .send({ username: 'michael', password: 'jordan' })
    });

    it('should return 200 ok', () => {
        return request(server)
            .get('/api/recipes')
            .set({ Authorization: token })
            .then(res => {
                expect(res.status).toBe(200);
            });
    });
});

// describe('server', function () {
//     describe('All CRUD for recipesRouter', function () {
//         //login with token so tests will be able to run 
//         beforeAll((done) => {
//             request(server)
//                 .post('/api/auth/login')
//                 .send({ username: 'michael', password: 'jordan' })
//                 done();
//         });

//         beforeEach(async () => {
//             // this function executes and clears out the table before each test
//             await db('users').truncate();
//         });


//         // it('should find recipes 200 ok', async () => {
//         //     let recipe = await Recipes.find();
//         //     expect(res.status)toEqual(200);
//         // });

//         test('should return 200 ok with correct credentials', async () => {
//             const res = await request(server)
//             .get('/api/recipes')
//             .set('Authorization', token)
//             .then(res => {
//                 expect(res.status).toBe(200);
//             })
//         });

//         // it('should find recipes with success message', async () => {
//         //     let recipe = await Recipes.find();
//         //     expect('Success');
//         // });

//     });
// });
