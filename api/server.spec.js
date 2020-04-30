const request = require('supertest');
const server = require('./server');
const db = require('../data/dbConfig');

describe("server", function () {
        test('should run the test', function() {
            expect(true).toBe(true);
        });

    describe("GET /", function () {
      it("should return 200 OK", function () {
        return request(server) 
          .get("/")
          .then(res => {
            expect(res.status).toBe(200);
          });
      });
    });

    describe("GET /", function () {
        it("should return message: Welcome To The Secret Family Recipes API!", function () {
          return request(server) 
            .get("/")
            .then(res => {
              expect(res.body.message).toBe('Welcome To The Secret Family Recipes API!');
            });
        });
      });

});