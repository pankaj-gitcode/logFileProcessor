import axios from 'axios';
import React, { useState } from 'react'

export default function FileUpload() {
    const [file, setFile] = useState();
    const [privateIps, setPrivateIps] = useState([]);
    const [publicIps, setPublicIps] = useState([]);
    const [fileName, setFileName] = useState('');

    // file upload handler
    const fileHandler = (e)=>{
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log('FILE UPLOADED',file)
}

    // button: upload file handler
    const uploadHandler = async()=>{
        try{

            // formData to store files
            const formData = new FormData();
            formData.append('logFile', file);
    
            //fetch API to send log file & return the IPs
            const {data} = await axios.post("http://localhost:5000/process/upload", formData,{
                headers:{'Content-Type': 'multipart/form-data'}
            })
            console.log("DATA-FRONTEND: ",data)
            console.log('PVT: ', data.privateIps)
            if(!data.success){alert('API Fetch Issue...') }
            setPrivateIps(data.privateIps || []);
            setPublicIps(data.publicIps || []);
            setFileName(data.fileName || '');
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
        name="" 
        className='bg-gray-500 py-2 px-2 rounded-2xl cursor-pointer' />

        {/* ----- UPLOAD BUTTON ----- */}
        <button onClick={uploadHandler}
        className='bg-gradient-to-r from-gray-500 to-gray-700 py-2 px-6 rounded-2xl cursor-pointer active:scale-105'>
        Submit</button>

        <div>
            <ul>
                <h1 className='p-2 text-white text-xl'>File Name: {fileName}</h1>
                {
                    privateIps?.map(pvIP=>(
                        <li>{pvIP}</li>
                    ))
                    
                }
                {
                    publicIps?.map(pubIPs=>(
                        <li>{pubIPs}</li>
                    ))
                }
            </ul>
            <p>hi: {privateIps}</p>
        </div>
    </div>
  </>)
}
