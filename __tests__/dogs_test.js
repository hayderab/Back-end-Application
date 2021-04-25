const app = require('../app')
const request = require('supertest');
const mongoose = require('mongoose');



describe('Post new dog ', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/dogs')
        .send({
            name:"Test",
            type:"Bulldog", 
            location:"Birmingam", 
            avilable:"false", 
            imageUrl:"uploads/test"
        })
      expect(res.statusCode).toEqual(401)
    //   expect(res.body).toHaveProperty("user")
    })
  });

  afterEach(async () => {
    // await app.close();
    await  mongoose.connection.close();
  });

 
 