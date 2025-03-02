const { default: mongoose } = require("mongoose");


const IPSchema = new mongoose.Schema({
    fileName: {type:String, unique:true},
    privateIP: {type:[String], default:[]},
    publicIP: {type:[String], default:[]}
})




// const IPModel = mongoose.model.iptable  || mongoose.model('iptable', IPSchema )
const IPModel = mongoose.model.iptable2  || mongoose.model('iptable2', IPSchema )
module.exports={IPModel}

