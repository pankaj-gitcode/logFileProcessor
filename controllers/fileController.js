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
           
            
            // ---------- EXTRACTING IPs ----------

            // validate the IPs Octet and create regExp
            const IpRegExp = /(?=[0-9]{1,3}\.){3}[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}/g

            // match with str: all IP arrays
            const MatchIp = data.match(IpRegExp)
            
            console.log('DATA: ', typeof MatchIp)

            // find Unique IPs
            const uniqueArry = Array.from(MatchIp.reduce((map,ip)=>map.set(ip), new Map()).keys())

            return res.status(200).json({
                success: true,
                message: 'Data Processed',
                // allIPs: MatchIp,
                uniqueIps: uniqueArry,
                // processedData: data
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