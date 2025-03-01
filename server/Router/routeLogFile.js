const express = require('express');
const { logFileController } = require('../controllers/fileController');
const multer = require('multer');
const {upload} = require('../middleware/multerMiddleware')

const logFileRouter = express.Router();

logFileRouter.get('/file', logFileController);


// middleware-multer store the file and passes to controller
logFileRouter.post('/upload', upload.single('logFile'), logFileController);

module.exports={logFileRouter};