const app = require('../app')
const request = require('supertest');
const mongoose = require('mongoose');



// describe('Post new dog ', () => {
//     it('should not create a new dog', async () => {
//       const res = await request(app)
//         .post('/api/dogs')
//         .send({
//             name:"Test",
//             type:"Bulldog", 
//             location:"Birmingam", 
//             avilable:"false", 
//             imageUrl:"uploads/test"
//         })
//       expect(res.statusCode).toEqual(40)
//     //   expect(res.body).toHaveProperty("user")
//     })
//   });


  describe('Post new dog ', () => {
    it('should not be able to add dog', async () => {
      const res = await request(app)
        .post('/api/dogs/')
        .set('Cookie', `token=${process.env.COOKIE}`)
        .send({
            name:"Test",
            type:"Bulldog", 
            location:"Birmingham", 
            avilable:"false", 
            imageUrl:"uploads/test"
        })
      expect(res.statusCode).toEqual(400)
      // console.log(process.env.COOKIE)
     //   expect(res.body).toHaveProperty("user")
    })
  });

  // describe('Post new dog ', () => {
  //   it('should be able to add dogs to fav', async () => {
  //     const res = await request(app)
  //       .post('/api/user/addfav')
  //       .set('Cookie', `token=${process.env.COOKIE}`)
  //       .send({
  //           name:"Test",
  //           type:"Bulldog", 
  //           location:"Birmingham", 
  //           avilable:"false", 
  //           imageUrl:"uploads/test"
  //       })
  //     expect(res.statusCode).toEqual(404)
  //     // console.log(process.env.COOKIE)
  //    //   expect(res.body).toHaveProperty("user")
  //   })
  // });

  afterEach(async () => {
    // await app.close();
    await  mongoose.connection.close();
  });

 
 