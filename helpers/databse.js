// // Export database connection information.
//  // Use the environment settings or given defaults. 
//  exports.config = { 
//     host: process.env.DB_HOST || "localhost",
//     port: process.env.DB_PORT || 3306, 
//     user: process.env.DB_USER || "root", 
//     password: process.env.DB_PASSWORD || "toor",
//     database: process.env.DB_DATABASE || "dogs_shelter",
//     connection_limit: 100 
// }


// Using Node.js `require()`
const mongoose = require('mongoose');

// conncting to the database.
const uri = "mongodb+srv://600cem-cw:600cem-cw@cluster0.x3avy.mongodb.net/dogs_shelters?retryWrites=true&w=majority";

const dbconnection =  async () => {
    await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      })
      .then(() => console.log("Database connected..."))
      .catch(err => console.log(err));
}


module.exports = dbconnection;