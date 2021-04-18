const express  = require('express');
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app =  express(); 
const database = require("./helpers/databse.js")
const users = require('./routes/users.js');
const dogs = require('./routes/dogs.js');
const shelters = require('./routes/shelters.js');
const auth = require("./controllers/auth.js")

//  const Welcome = (req, res) => {
//     res.json("Welcome to DogShleter Api");
//  }
 
app.use('/uploads', express.static('uploads'))
app.use(express.json());
app.use(cors({origin: "http://localhost:3000", credentials: true}));
app.use(cookieParser());
app.use('/api/users',users); 
app.use('/api/auth',auth); 
app.use('/api/dogs',dogs); 


// app.use('/api/shelters',shelters); 
app.use(cookieParser());
database();

 let port = process.env.PORT || 5000;

// Finally, run the app as a process on a given port

app.listen(port);
console.log(`listing on ${port}`)
