import axios from 'axios';
import React, { useState } from 'react'

export default function FileUpload() {
    const [file, setFile] = useState();
    const [privateIps, setPrivateIps] = useState([]);
    const [publicIps, setPublicIps] = useState([]);
    const [fileName, setFileName] = useState('');
    const [uploading, setUploading] = useState(false);

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
            const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/process/upload`, formData,{
                headers:{'Content-Type': 'multipart/form-data'},
                onUploadProgress: (progressEvent) => {
                    console.log(`Upload Progress: ${(progressEvent.loaded / progressEvent.total) * 100}%`);
                }
            })
            console.log("DATA-FRONTEND: ",data)
            console.log('PVT: ', data.privateIps)
            if(!data.success){alert('API Fetch Issue...') }
            setPublicIps(data.publicIPs || []);
            setPrivateIps(data.privateIPs || []);
            setFileName(data.fileName || '');
        }
        catch(err){
            console.log('Component-API-ERROR: ', err.message);
        }
        setUploading(false); // Hide loading state


    }


  return (<>
    <div className=' p-3 flex flex-col items-center justify-center gap-2 h-[80vh] w-[80vw] shadow-[2px_2px_10px_5px_rgba(0,0,0,0.5)]'>
        {/*  ----- TITLE ----- */}
        <h1 className='text-2xl '>Upload Log files here:</h1>

        {/*  ----- FILE UPLOAD ----- */}
        <input type="file" onChange={fileHandler} accept='.txt,.log,.docx,.xlsx '
        name="" 
        className='bg-gradient-to-b from-white to-gray-500 py-2 px-2 rounded-2xl cursor-pointer' />

        {/* ----- UPLOAD BUTTON ----- */}
        <button onClick={uploadHandler}
        className='bg-gradient-to-r from-gray-500 to-gray-700 py-2 px-6 rounded-2xl cursor-pointer active:scale-105 duration-300 ease-in-out'>
        Submit</button>

        {uploading && <p>Uploading file, please wait...</p>}

                <h1 className='p-2 text-white text-xl'>File Name: {fileName}</h1>
        <div className='h-[50vh] w-[50vw]  overflow-auto mt-8 border-4 border-gray-600 shadow-[1px_1px_10px_0px_rgba(255,255,255,0.5)]'>
            <ul className='flex items-start justify-between p-5'>
                <div>
                <h1 className='text-xl underline '>PRIVATE_IPs: </h1>
                {
                    privateIps?.map(pvIP=>(
                        <li key={pvIP} className='text-[13px] '>{pvIP}</li>
                    ))
                    
                }
                </div>
                <div>
                <h1 className='text-xl underline '>PUBLIC_IPs: </h1>
                {
                    publicIps?.map(pubIPs=>(
                        <li key={pubIPs} className='text-[13px] '>{pubIPs}</li>
                    ))
                }
                </div>
            </ul>
            
        </div>
    </div>
  </>)
}
