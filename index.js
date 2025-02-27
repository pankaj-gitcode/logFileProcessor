// import express from 'express'
// import logFileRouter from './Router/routeLogFile.js';

const express = require('express');
const dotEnv = require('dotenv/config');
const {logFileRouter} =  require('./Router/routeLogFile.js');
const { dbConnect } = require('./db/db.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());

app.listen(PORT, (req,res)=>console.log(`Listening PORt is: ${PORT} \n http://localhost:${PORT}`));
app.get('/', (req,res)=>{
    res.status(200).json({
        success: true,
        message: 'Server is Up!...'
    })
})

app.use('/process', logFileRouter);

dbConnect();