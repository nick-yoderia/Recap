import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"
import RecapDisplayBox from "../components/RecapDisplayBox"
import LoadingStatus from '../components/LoadingStatus'
import {Link} from 'react-router-dom'
import {uploadFile} from '../axios/uploadFile'
import {useRef, useState} from "react" 
import { useNavigate } from 'react-router-dom';

export default function UploadScreen () {
  const navigate = useNavigate();

  const [loading, isLoading] = useState(null) 
  const [file, setFile] = useState(null)

  const handleUpload = async () => {
    try {
        if (!file) {
          alert("No file uploaded")
          return;
        }
        isLoading(true) 
        const result = await uploadFile(file);
        navigate ('/Summary', 
          {state: 
            { meeting: 
              {title: file ? file.name : "filename", summary: result.summary, transcript: result.transcript}, 
            display: {content: result.summary, title:'Summary'} 
            } 
          }
        )

    } catch (error) {
        console.error(error);
    } finally{
      isLoading(false)
    }
  };

  const meetings = []
    return (
    <div className = 'w-screen max-w-360 mx-auto'>
     
     <div className = ' pt-10 text-center text-3xl md:text-5xl flex place-content-center flex-col'>
      <div className = ' '>
          Welcome to Recap! 
          <span className = 'md:text-2xl font-mono text-sm flex flex-col py-5 text-light text-teal-100 md:row-start-3 '>
            Generate new recaps or view past ones
          </span>
        </div>
      </div>

      <div className = 'md:grid  md:grid-cols-5 md:h-screen  md:p-0 p-5 md:gap-15 font-sans'> 
        <div className = 'md:col-span-3 md:col-start-1  md:row-start-2 md:row-span-10 sm:max-h-[calc(100dvh-450px)] pl-2'>
          
            <FileUploader  fileSelect={setFile} disabled={loading} />
            <div className = 'flex justify-center text-sm pt-10 place-content-center'>
                {loading ? ( 
                  <LoadingStatus /> 
                ): (<AnimatedButton onClick={handleUpload}>
                    Generate recap!
                  </AnimatedButton>)}
            </div>
        </div>
        
        <div className = 'md:col-span-2 md:col-start-4  md:row-start-2 pr-3'>
          <div className=' overflow-auto scrollbar-thin scrollbar-thumb-gray-400  border rounded-2xl  bg-slate-900  sm:h-auto sm:row-start-3 text-1xl sm:max-h-[calc(100dvh-390px)]'>
            <div className = 'p-3 flex  place-content-center ' >
              <div className='text-center text-2xl w-full text-white/90 text-bold '>
                My Recaps
              </div>
            </div>

        
            <div className = 'md:overflow-hidden '>
                <RecapDisplayBox meetings = {meetings} />
            </div>   
          </div>
        </div>
      </div>
    </div>
  )
} 