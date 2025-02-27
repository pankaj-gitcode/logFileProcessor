const fs = require('fs');
const path = require('path')
const { logFiles } = require('../logFiles/asset');
const ip = require('ip');
const { createDB } = require('./ipDB');


const logFileController = async (req,res)=>{
    try{
        // join the log file to current controller path
        // const fileDir = path.join(__dirname, '../logFiles/test.log')
        const fileDir = path.join(__dirname, '../logFiles/test1.log')

        // reading the file
        return fs.readFile(fileDir, 'utf8', (err,data)=>{

            if(err){
                return res.status(403).json({
                    success:false, message: `ERROR:=> ${err.message}`
                })
            }
           
            
            // ---------- EXTRACTING IPs ----------

            // validate the IPs Octet and create regExp
            const IpRegExp = /\b(?:(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\b/g


                 // ----- MIXED IPs -----
            // match with str: all IP arrays
            const MatchIp = data.match(IpRegExp)
            console.log('MATCHIP: ', MatchIp)

                // ----- UNIQUE IPs -----
            const uniqueIPArry = Array.from(MatchIp.reduce((map,ip)=>map.set(ip), new Map()).keys())
            // console.log('uniqueIP: ', uniqueIPArry)


            //  ----- SEGGRIGATE PUBLIC & PRIVATE IPs -----
            const privateCIDRs = ['172.16.0.0/16', '10.0.0.0/8', '192.168.0.0/16', '127.0.0.0/8', '169.254.0.0/16'];

            // empty privateIP & PublicIP arrays
            const privateIP = [];
            const publicIP = [];

            //check each unique IP contained by the CIDR subnet
            uniqueIPArry.forEach(ipAddr=>{
                const privateIPs = privateCIDRs.some(cidrIP=>ip.cidrSubnet(cidrIP).contains(ipAddr)) ;
                if(privateIPs){privateIP.push(ipAddr)} 
                else{publicIP.push(ipAddr)}
            })
            
            console.log({privateIP, publicIP})

            // Invoke db table
            createDB('logFile3', privateIP, publicIP)


            return res.status(200).json({
                success: true,
                message: 'Data Processed',
                // processedData: data,
                // allIPs: MatchIp,
                // uniqueIps: uniqueIPArry,
                privateIPs: privateIP,
                publicIPs: publicIP
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