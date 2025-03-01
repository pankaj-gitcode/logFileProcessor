const { default: mongoose } = require("mongoose")

const dbConnect = async()=>{
    try{
        await  mongoose.connect(`${process.env.DB_URL}/filteredIP`)
        // await  mongoose.connect(`${process.env.DB_URL}`)
        .then(()=>console.log('DB CONNECTED...'))
    }
    catch(err){
        console.log('DB-ERROR: ', err.message);
    }
}


module.exports={dbConnect}





// const dbConnect = async()=>{
//     try{
//    await mongoose.connect(`${process.env.BACKEND_URL}/ipanalyser/`) 
//    .then((data)=>console.log('DB Connected... '))
// //    .then((data)=>console.log('DB COnnceted: ', data))
//     }
//     catch(err){
//         console.log('DB-ERROR: ', err.message);
//     }
// }

