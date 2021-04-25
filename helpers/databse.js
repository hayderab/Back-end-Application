
// Using Node.js `require()`
const mongoose = require('mongoose');

// conncting to the database.
const uri = "mongodb+srv://600cem-cw:600cem-cw@cluster0.x3avy.mongodb.net/dogs_shelters?retryWrites=true&w=majority";
// const uri = "mongodb+srv://600cem-cw:600cem-cw@cluster0.x3avy.mongodb.net/test_shelters?retryWrites=true&w=majority";

const dbconnection =  async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      // .then(() => console.log("Database connected..." ))
      .catch(err => console.log(err));
}


module.exports = dbconnection;