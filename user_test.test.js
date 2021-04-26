
const app = require('./app')
const request = require('supertest');
const mongoose = require('mongoose');
const Users = require('./models/users');
const dogs = require('./models/dogs');
const fs = require('fs')
const cookieParser = require('cookie-parser');
const { promisify } = require('util')
const unlinkAsync = promisify(fs.unlink)


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
            sigupcode:"600cem",
            password:"password"
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty("user")
    })
    
  });


let cookie;
let id;

describe('Post new user', () => {
    it('should login ', async () => {
      const res = await request(app)
        .post('/api/auth')
        .send({
          email: user.email, 
          password: user.password
        }).expect(200)
        .then((res) =>{
          //const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
          const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
          cookie = cookies.join(';');
          cookie = cookie.replace("token=", ``)
          // console.log(cookie)
          process.env.COOKIE = cookie
        })
      });
      // expect(res.body).toHaveProperty('created', true)
    })


    // const filePath = `${__dirname}../uploads/dogsTest.jpg`;
    describe('Post new dog ', () => {
      it('should be able to add dogs', async () => {
        const res = await request(app)
          .post('/api/dogs/')
          // .set('Cookie', `token=${cookie}`)
          .set('Cookie', `token=${cookie}`)
          .field("name", "test")
          .field("type", "test")
          .field("location", "Birmingham")
          .field("avilable", "false")
          .attach("imageUrl", './uploads/dogsTest.jpg')
        .expect(201)
        .then((res) =>{
          id = res.body._id
        })
      })
       
    });

    describe('Post new dog ', () => {
      it('should be able to update dogs', async () => {
        const res = await request(app)
          .put(`/api/dogs/update/${id}`)
          // .set('Cookie', `token=${cookie}`)
          .set('Cookie', `token=${cookie}`)
          .field("name", "test")
          .field("type", "test")
          .field("location", "Birmingham")
          .field("avilable", "false")
          .attach("imageUrl", './uploads/dogsTest.jpg')
        expect(res.statusCode).toEqual(200)
      })

    });

    describe('Post new dog ', () => {
      it('should be able to delete dogs', async () => {
        const res = await request(app)
          .delete(`/api/dogs/delete/${id}`)
          .set('Cookie', `token=${cookie}`)
        expect(404)
      })
      afterEach(async () => {
        // deleteFile("./uploads/Test.jpg")
        await Users.deleteMany({})
        await dogs.deleteMany({})
      });
    });




