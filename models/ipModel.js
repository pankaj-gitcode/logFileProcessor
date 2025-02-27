const { default: mongoose } = require("mongoose");




const IPSchema = new mongoose.Schema({
    fileName: {type:String, unique:true},
    privateIP: {type:[String], unique:true, default:[]},
    publicIP: {type:[String], unique:true, default:[]}
})

const IPModel = (logFileName)=>{
    // replaced if any '.' in filename
    const ipFile = logFileName.replace(/\./, '_');
    //create Model if not 
    return mongoose.model.ipFile || mongoose.model(ipFile, IPSchema)

}

module.exports={IPModel}





// Schema for filename, private & public IPs
// const logSchema = new mongoose.Schema({
//     logfileName: { type: String, unique: true, required: true },
//     privateIP: { type: [String], default: [] },
//     publicIP: { type: [String], default: [] }
// });

// // Function to get or create a Mongoose model dynamically
// const getLogModel = (logFileName) => {
//     const modelName = logFileName.replace(/\./g, "_"); // Replace '.' to avoid MongoDB issues

//     // Check if model already exists, otherwise create it
//     return mongoose.models[modelName] || mongoose.model(modelName, logSchema);
// };

// module.exports = { getLogModel }; // Export as an object
