const { default: mongoose } = require("mongoose")


const dbConnect = async()=>{
    try{
   await mongoose.connect(`${process.env.BACKEND_URL}/ipanalyser`) 
   .then((data)=>console.log('DB Connected... '))
//    .then((data)=>console.log('DB COnnceted: ', data))
    }
    catch(err){
        console.log('DB-ERROR: ', err.message);
    }
}

module.exports={dbConnect};