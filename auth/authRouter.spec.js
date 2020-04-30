const request = require('supertest');
const db = require('../data/dbConfig');
const server = require('../api/server');

describe('server', function () {
    describe('CRUD for authRouter reqs', function () {
        beforeEach(async () => {
          await db('users').truncate(); 
        });
        
        //POST - /register
        it(' should return 201 on success', function () {
          return request(server)
            .post('/api/auth/register')
            .send({ username: 'michael', password: 'jordan' })
            .then(res => {
              expect(res.status).toBe(201);
            });
        });
    
        it('should return a message saying "Registration successful"', function () {
          return request(server)
            .post('/api/auth/register')
            .send({ username: 'michael', password: 'jordan' })
            .then(res => {
              expect(res.body.message).toBe('Registration successful');
            });
        });
        
        //POST - /login
        it('not providing both credentials should be status 401', function () {
            return request(server)
              .post('/api/auth/login')
              .send({ username: 'michael' })
              .then(res => {
                expect(res.status).toBe(401);
              });
          });
      
          it('should return a message saying "Invalid username or password"', function () {
            return request(server)
              .post('/api/auth/login')
              .send({ username: 'michael' })
              .then(res => {
                expect(res.body.message).toBe('Invalid username or password');
              });
          });
          
          //PUT - /edit_user/:id
          it('should return 204 on success', function () {
            return request(server)
              .put('/api/auth/edit_user/:id')
              .send({ username: 'michael23', password: 'jordan' })
              .then(res => {
                expect(res.status).toBe(204);
              });
          });
      
          it('should return a message saying "Registration successful"', function () {
            return request(server)
              .put('/api/auth/edit_user/:id')
              .send({ username: 'michael23' })
              .then(res => {
                expect(res.status).toBe(500);
              });
          });
          
          //DELETE - /delete_user/:id
          it('should return 204 on success', function () {
            return request(server)
              .delete('/api/auth/delete_user/:id')
              .then(res => {
                expect(res.status).toBe(204);
              });
          });
      
          it('should return a message saying "Successfully deleted user"', function () {
            return request(server)
              .delete('/api/auth/delete_user/')
              .then(res => {
                expect(res.status).toBe(404);
              });
          });

     });
});
