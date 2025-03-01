const fs = require('fs');
const path = require('path')
const { logFiles } = require('../logFiles/asset');
const ip = require('ip');
const { createDB } = require('./ipDB');
const multer  = require('multer');


const logFileController = async (req,res)=>{
    try{

        console.log('req.file: ', req.file)

        // stop from undefined if file not uploaded
        if(!req.file || !req.file.filename){
            return res.status(400).json({success:false, message:"No File Uploaded!"});
        }


        // join the log file to current controller path
        
        // const fileDir = path.join(__dirname, req.file.path)
        const fileDir = path.join(__dirname, '../uploads', req.file.filename);


        // reading the file
        return fs.readFile(fileDir, 'utf8', (err,data)=>{

            if(err){
                return res.status(500).json({
                    success:false, message: `ERROR Reading File:=> ${err.message}`
                })
            }
           
            
            // ---------- EXTRACTING IPs ----------

            // validate the IPs Octet and create regExp
            const IpRegExp = /\b(?:(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|1?[0-9][0-9]?)\b/g


                 // ----- MIXED IPs -----
            
            const MatchIp = data.match(IpRegExp)
            console.log('MATCHIP: ', MatchIp)

                // ----- UNIQUE IPs -----
            const uniqueIPArry = Array.from(MatchIp.reduce((map,ip)=>map.set(ip), new Map()).keys())
            // console.log('uniqueIP: ', uniqueIPArry)


            //  ----- SEGREGATE PUBLIC & PRIVATE IPs -----
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
            
            const filename = req.file.filename;
            console.log({privateIP, publicIP, filename:req.file.filename});

            // Invoke db table
            createDB(filename, privateIP, publicIP)


            return res.status(200).json({
                success: true,
                message: 'Data Processed',
                // processedData: data,
                // allIPs: MatchIp,
                // uniqueIps: uniqueIPArry,
                fileName:filename,
                privateIPs: privateIP,
                publicIPs: publicIP
            })
        })
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: `Server ERROR=>: ${err.message}`
        })
    }
}

module.exports= {logFileController}