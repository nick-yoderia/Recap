import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"
import RecapDisplayBox from "../components/RecapDisplayBox"

export default function UploadScreen () {

    return (
    <div className = 'sm:grid sm:grid-cols-5 sm:h-screen sm:py-5 sm:p-0 p-5 sm:gap-15'>
     
     <div className = 'sm:col-span-3 sm:col-start-2 sm:row-start-2 text-center font-mono text-3xl sm:text-5xl border-b rounded-2xl'>
          Welcome to recap! 
          <span className = 'sm:text-2xl text-sm flex flex-col py-5 text-light text-teal-100 sm:row-start-3 '>
            Generate new recaps or view past ones
          </span>
      </div>

      <div className = 'sm:col-span-3 sm:col-start-1 sm:pt-0 pt-10 text-md sm:row-start-4 place-content-center sm:p-1 p-3'>
          <FileUploader />
          <div className = 'flex justify-center text-sm pt-10 place-content-center'>
              <AnimatedButton>Generate recap!</AnimatedButton>
          </div>
      </div>

      
      <div className = 'sm:col-span-2 sm:col-start-4 sm:row-start-3 sm:row-span-10'>
        <div className='text-center font-mono text-2xl sm:pt-0 pt-10 sm:pb-5 text-teal-100'>
          Past recaps
        </div>

        <div className=' overflow-auto border rounded-3xl max-h-[30vh] sm:max-h-[50vh] sm:h-auto sm:row-start-3 text-1xl'>
          <div className = ''>
              <RecapDisplayBox 
              meeting={{
                id: 123,
                title: "None yet waiting for  DB",
                date: "October 30, 2026",
                status: "Completed"
            }} /> 
          </div>   
        </div>
      </div>
    </div>
  )
} 