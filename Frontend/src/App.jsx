import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router';

const FileUpload = lazy(()=>import('./components/FileUpload'));


export default function App() {
  return(<>
    <div className='bg-black h-screen text-white border-4 m-2 rounded-2xl'>
      <Suspense fallback={<p>Loading...</p>}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<FileUpload/>}/>
        </Routes>
      </BrowserRouter>

      </Suspense>
    </div>
  </>)
}
