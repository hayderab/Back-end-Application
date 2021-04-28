const app = require('../app')
const request = require('supertest');
const mongoose = require('mongoose');
const { ObjectID } = require('bson');

//testing normal user and prermissions
const user = {
    email: 'normalUser@example.com',
    password: 'password'
 }

 const dogs = {
  ObjectID:"6070d30102d9053060a0998d",
  name:"test",
  type:"testt1",
  location:"uknownnn", 
  avilable:"true",
  imageUrl:"/uploads",
}


let cookie;
let id;

 describe('Post new user', () => {
    it('should create a new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
            firstName:"tester",
            lastName:"jst" , 
            location:"Birmingham",
            email:'normalUser@example.com', 
            sigupcode:"test",
            password:"password"
        })
      expect(res.statusCode).toEqual(201)
      expect(res.body).toHaveProperty("user")
    })

    it('should not be able to create new user', async () => {
        const res = await request(app)
          .post('/api/users')
          .send({
              firstName:"tester",
              lastName:"jst" , 
              email:'normalUser@example.com', 
              sigupcode:"test",
              password:"password"
          })
        expect(res.statusCode).toEqual(400)
        // expect(res.body).toHaveProperty("user")
      })
     
  });

describe('Post new user', () => {
    it('should not be able to login ', async () => {
      const res = await request(app)
        .post('/api/users/login')
        .send({
          email: user.email, 
          password: "fgdfgdf"
        }).expect(400)
      });
    
  });

   

describe('Post user login', () => {
    it('should login ', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
              email:user.email, 
              password:user.password
            }).expect(200)
            .then((res) =>{
              const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
              cookie = cookies.join(';');
              cookie = cookie.replace("token=", ``)
              // console.log(cookie)
              process.env.COOKIE = cookie
            })
    });
    it('checking if user logged and have credientials', async () => {
        const res = await request(app)
            .post('/api/users/loggedin')
            .set('Cookie', `token=${cookie}`)
            .expect('Content-Type', /json/)
            .expect({ sigupcode: false, login: true })
    });
 });


// describe('Post adding dogs to fav', () => {
//    it('should return login signup code false and login true', async () => {
//       const res = await request(app)
//           .post(`/api/users/addtofav/${dogs._id}`)
//           .set('Cookie', `token=${cookie}`)
//           .expect({message: "Added dogs to favourites" })
//      });
// })


