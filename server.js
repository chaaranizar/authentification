// 1 require express
const express = require('express');

// 2 create instance
const app = express();

// 5 require dotenv & config
require("dotenv").config();

// 6 require connectDB
const connectDB = require('./config/connectDB');
connectDB();
// 8 Middleware bodyParser
app.use(express.json());
// 7 routing
app.use('/api/user', require('./routes/user'));

//7 routes

// 3 create PORT
const PORT = process.env.PORT

// 4 create server
app.listen(PORT, error => {
    error 
        ? console.error (`Fail to connect to server!!! ${error}`) 
        : console.log(`Server is running on port ${PORT}`)
})