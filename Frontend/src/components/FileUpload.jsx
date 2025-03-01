import axios from 'axios';
import React, { useState } from 'react'

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [privateIps, setPrivateIps] = useState([]);
    const [publicIps, setPublicIps] = useState([]);

    // file upload handler
    const fileHandler = (e)=>setFile(e.target.files[0])

    // button: upload file handler
    const uploadHandler = async()=>{
        try{

            // formData to store files
            const formData = new FormData();
            formData.append('logfile', file);
    
            //fetch API to send log file & return the IPs
            const {data} = await axios.post("https://localhost:5000/upload", formData)
    
            setPrivateIps(data.privateIps);
            setPublicIps(data.publicIps);
        }
        catch(err){
            console.log('Component-API-ERROR: ', err.message);
        }


    }


  return (<>
    <div className='flex flex-col items-center justify-center gap-2 h-[80vh] w-[80vw]'>
        {/*  ----- TITLE ----- */}
        <h1 className='text-2xl '>Upload Log files here:</h1>

        {/*  ----- FILE UPLOAD ----- */}
        <input type="file" onChange={fileHandler} accept='.txt,.log,.docx,.xlsx '
        name="" placeholder='files' 
        className='bg-gray-500 py-2 px-2 rounded-2xl cursor-pointer' />

        {/* ----- UPLOAD BUTTON ----- */}
        <button onClick={uploadHandler}
        className='bg-gradient-to-r from-gray-500 to-gray-700 py-2 px-6 rounded-2xl'>
        Submit</button>

        <div>
            <ul>
                {
                    privateIps.map(pvIP=>(
                        <li>{pvIP}</li>
                    ))
                    
                }
                {
                    publicIps.map(pubIPs=>(
                        <li>{pubIPs}</li>
                    ))
                }
            </ul>
        </div>
    </div>
  </>)
}
