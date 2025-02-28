const express = require('express');
const { logFileController } = require('../controllers/fileController');

const logFileRouter = express.Router();

logFileRouter.get('/file', logFileController)

module.exports={logFileRouter};