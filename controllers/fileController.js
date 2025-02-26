const fs = require('fs');
const path = require('path')
const { logFiles } = require('../logFiles/asset');

const logFileController = (req,res)=>{
    try{
        const fileDir = path.join(__dirname, '../logFiles/test.log')
        return fs.readFile(fileDir, 'utf8', (err,data)=>{
            if(err){
                return res.status(403).json({
                    success:false, message: `ERROR:=> ${err.message}`
                })
            }
           
            console.log('DATA: ', [typeof data, data])
            return data
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