const app = require('../app')
const request = require('supertest');
const mongoose = require('mongoose');

//testing normal user and prermissions
const user = {
    email: 'normalUser@example.com',
    password: 'password'
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
        .post('/api/auth')
        .send({
          email: user.email, 
          password: "fgdfgdf"
        }).expect(400)
      });
    
    })

   

describe('Post user login', () => {
    it('should login ', async () => {
        const res = await request(app)
            .post('/api/auth')
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

    it('should login ', async () => {
        const res = await request(app)
            .post('/api/auth/logedin')
            .set('Cookie', `token=${cookie}`)
            .expect('Content-Type', /json/)
            .expect({ sigupcode: false, login: true })
    });
})