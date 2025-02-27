const { IPModel } = require("../models/ipModel")


const createDB = async(fileName, privateIP, publicIP)=>{
    const flName = fileName.replace(/\./g, '_')

    const newIPModel = IPModel(fileName)

    // check if specific file already exist
    const ipTable = await newIPModel.findOne({fileName: flName})
    if(ipTable){
        console.log('ipTable already exist');
        return;
    }

    const ipInfo = await newIPModel.create(
        {
            fileName:flName, 
            privateIP, publicIP
        })
    return ipInfo;
}

module.exports={createDB};