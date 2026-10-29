import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"

export default function UploadScreen () {

    return (
    <div className = 'grid grid-cols-7 h-screen py-10 gap-15'>
     
     <div className = 'col-span-3 col-start-1 row-start-2 text-center font-mono text-5xl border-b rounded-3xl bg-linear-to-t from-slate-950 to-slate-900 shadow-2xl'>
          Welcome  to recap! 
          <span className = 'text-2xl  flex flex-col py-5 text-light text-teal-100 row-start-3 '>
            Generate a new recap, or view an old one.
          </span>
      </div>

      <div className = 'col-span-3 col-start-1  text-small row-start-3 place-content-center'>
          <FileUploader />
          <div className = 'flex justify-center  pt-10 place-content-center'>
              <AnimatedButton>Generate recap!</AnimatedButton>
          </div>
      </div>

      
      <div className = 'col-span-4 col-start-4 row-start-1 row-span-10'>
        <div className='text-center font-mono text-3xl pb-5'>
          Previous recaps: 
        </div>

        <div className=' overflow-auto border text-center gap-y-3 rounded-3xl min-h-[70vh] h-auto p-3 text-2xl'>
          <div>  no recaps...</div>
 
        </div>
   
      </div>
    </div>
  )
} 