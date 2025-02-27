const { dbConnect } = require("../db/db")
const { getLogModel } = require("../models/ipModel")

const ipDatabase = async(logFiles, privateIP, publicIP)=>{
    await dbConnect();

    //check if logFiles already exist
    const logFile = getLogModel(logFiles)
    const logData = await logFile.findOne({logfileName: logFiles})
    if(logData){
        console.log(`${logFiles} already exist!`)
        return null
    }

    const ipTable = await logData.create({logFiles, privateIP, publicIP})
    return ipTable
}

module.exports={ipDatabase};