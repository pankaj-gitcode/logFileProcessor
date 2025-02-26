// import fs from 'fs/promises'
// import { logFiles } from '../logFiles/asset.js'

// export const readFile = async(req, res)=>{

//      try{
//         const data = await fs.readFile(logFiles.logFile, 'utf8');
//         if(!data){
//             return res.status(404).json({
//                 success: false, message: `ERROR=: ${err.message}`
//             })
//         }
//         console.log("DATA are: ", data);
//         return res.status(200).json({
//             success: true,
//             message: `Data processed: ${data}`
//         })

        
//      }
//      catch(err){
//         res.status(404).json({
//             succes: false,
//             message: `ERROR=>: ${err.message}`
//         })
//      }

// }