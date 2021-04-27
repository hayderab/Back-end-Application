const express  = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')


const app =  express(); 

const database = require("./helpers/databse.js")
const users = require('./routes/users.js');
const dogs = require('./routes/dogs.js');
const message = require('./routes/messages.js');
// const auth = require("./controllers/authrouter.js")


 
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use('/api/users',users); 
// app.use('/api/auth',auth); 
app.use('/api/dogs',dogs); 
app.use('/api/message',message); 

app.use(cookieParser());
database();

module.exports = app;
