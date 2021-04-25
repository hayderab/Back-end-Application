
const app = require('../app')
const request = require('supertest');
const mongoose = require('mongoose');
const Users = require('../models/users');
const cookieParser = require('cookie-parser');


const user = {
   email: 'unique_email@example.com',
   password: 'password'
}
// describe('POST /user', function() {
//     it('responds with json', function(done) {
//       request(app)
//         .get('/user')
//         .set('Accept', 'application/json')
//         .expect('Content-Type', /json/)
//         .expect(200, done);
//     });
//   });

// beforeEach(async() => {
//   await Users.deleteMany({})
//   // await Users(user).save();
//   // console.log("delete the table before posting data")
// })

describe('Post new user', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
            firstName:"tester",
            lastName:"jst" , 
            location:"Birmingham",
            email:'unique_email@example.com', 
            sigupcode:"test",
            password:"password"
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty("user")
    })
  });


let token;

describe('Post new user', () => {
    it('should login ', async () => {
      const res = await request(app)
        .post('/api/auth')
        .send({
          email: user.email, 
          password: user.password
        })
        // .end((err, response) =>{
        //   token = response.body.token; 
        //   done();
        // })
      expect(res.statusCode).toEqual(200)
      // expect(res.body).toHaveProperty('created', true)
    })
  });

  // console.log(token)




// afterEach(async () => {
//     // await app.close();
//     // await Users.deleteMany({})
//     await Users.deleteMany({})
//     await  mongoose.connection.close();
//   });