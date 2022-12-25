import './App.css';
import { RouterProvider } from 'react-router-dom';
import { Router } from './Router/Router';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader';

function App() {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false);

    }, 8000)
  },[])
  return (
    <>
   { 
    loading? <div className="flex flex-col h-screen w-screen items-center justify-center"><HashLoader  color="#005be6" /> <h1 className='text-3xl font-bold'>welcome To Mobile Ghor</h1></div>

   : <div className="max-w-[1440px] mx-auto">
      <RouterProvider router={Router}>

      </RouterProvider>
      <Toaster></Toaster>
    </div>
  }
    </>
  );
}

export default App;
