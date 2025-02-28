const { IPModel } = require("../models/ipModel")


// const createDB = async(fileName, privateIP, publicIP)=>{
//     const flName = fileName.replace(/\./g, '_')

//     const newIPModel = IPModel(fileName)

//     // check if specific file already exist
//     const ipTable = await newIPModel.findOne({fileName: flName})
//     if(ipTable){
//         console.log('ipTable already exist');
//         return;
//     }

//     const ipInfo = await newIPModel.create(
//         {
//             fileName:flName, 
//             privateIP, publicIP
//         })
//     return ipInfo;
// }


const createDB = async(filename, privateIP, publicIP)=>{
    try{
        const fileNameNew = filename.replace(/\./g, '_');

        const readTable = await IPModel.findOne({fileName: fileNameNew});

        // check if table already exist
        if(readTable){console.log('Table already exist...') ; return;};

        // create new table
        const createIPTable = await IPModel.create({fileName:fileNameNew, privateIP, publicIP});
        return createIPTable;
    }
    catch(err){
        console.log('ipDB-ERROR: ', err.message)
    }
}

module.exports={createDB};