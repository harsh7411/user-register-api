const express = require('express');
const connectDB = require('./config/db');
const userRouter = require('./routes/userRouter');
require('dotenv').config();

const app = express();

// Database connection
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Use the userRouter
app.use('/api', userRouter);

// Start the server
const port = process.env.PORT || 4000;
app.listen(port,()=>{
    console.log(`Server started at http://localhost:${port}`);
});
