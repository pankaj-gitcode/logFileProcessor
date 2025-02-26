const fs = require('fs');
const path = require('path')
const { logFiles } = require('../logFiles/asset');

const logFileController = (req,res)=>{
    try{
        // join the log file to current controller path
        const fileDir = path.join(__dirname, '../logFiles/test.log')

        // reading the file
        return fs.readFile(fileDir, 'utf8', (err,data)=>{

            if(err){
                return res.status(403).json({
                    success:false, message: `ERROR:=> ${err.message}`
                })
            }
           
            console.log('DATA: ', [typeof data, data])
            return res.status(200).json({
                success: true,
                message: `Data Processed: ${data}`
            })
        })
    }
    catch(err){
        res.status(404).json({
            success: true,
            message: `ERROR=>: ${err.message}`
        })
    }
}

module.exports= {logFileController}