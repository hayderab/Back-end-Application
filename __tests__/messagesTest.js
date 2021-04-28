const app = require('../app')
const request = require('supertest');


var nUid; 
var eid; 
var cookie;

describe('Post new user', () => {
    it('should create a  employee', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
            firstName:"tester",
            lastName:"jst" , 
            location:"Birmingham",
            email:'employeea@example.com', 
            sigupcode:"6003cem",
            password:"password"
        })
      .expect(201).then(res=>{
        eid = res.body.userId
        }) 
    })

    it('should login ', async () => {
      const res = await request(app)
          .post('/api/users/login')
          .send({
            email:"employeea@example.com", 
            password:"password"
          }).expect(200)
          .then((res) =>{
            const cookies = res.headers['set-cookie'][0].split(',').map(item => item.split(';')[0]);
            cookie = cookies.join(';');
            cookie = cookie.replace("token=", ``)
          })
    });

    it('send message', async () => {
      const res = await request(app)
        .post(`/api/message/createmessage/?id=${eid}`)
        .set('Cookie', `token=${cookie}`)
        .send({
            text:"jst"})
        expect(res.body).toHaveProperty("message")
    })

});



// describe('Post new user', () => {
  
// })