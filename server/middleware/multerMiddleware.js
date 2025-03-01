const multer = require("multer");
const path = require("path");

// Configure Multer Storage
// const storage1 = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Destination folder where files will be stored
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
//   },
// });


const storage = multer.diskStorage({
  destination:(req,file,cb)=>{cb(null, 'uploads/')}, // Destination folder where files will be stored
  filename: (req,file,cb)=>{cb(null, file.originalname.replace(/\./g, '_'))}
})

// Initialize Multer
const upload = multer({storage});


module.exports={upload}
