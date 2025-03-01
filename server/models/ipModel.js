const { default: mongoose } = require("mongoose");


const IPSchema = new mongoose.Schema({
    fileName: {type:String, unique:true},
    privateIP: {type:[String], unique:true, default:[]},
    publicIP: {type:[String], unique:true, default:[]}
})

// const IPModel = (logFileName)=>{
//     // replaced if any '.' in filename
//     const ipFile = logFileName.replace(/\./, '_');
//     //create Model if not 
//     return mongoose.model.ipFile || mongoose.model(ipFile, IPSchema)

// }


// const IPModel = mongoose.model.iptable  || mongoose.model('iptable', IPSchema )
const IPModel = mongoose.model.iptable2  || mongoose.model('iptable2', IPSchema )
module.exports={IPModel}

