import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"
import RecapDisplayBox from "../components/RecapDisplayBox"

export default function UploadScreen () {

    return (
    <div className = 'sm:grid sm:grid-cols-5 sm:h-screen sm:py-5 sm:p-0 p-5 sm:gap-15 font-sans'>
     
     <div className = 'sm:col-span-3 sm:col-start-2 sm:row-start-2 text-center text-3xl sm:text-5xl border-b rounded-2xl'>
          Welcome to Recap! 
          <span className = 'sm:text-2xl font-mono text-sm flex flex-col py-5 text-light text-teal-100 sm:row-start-3 '>
            Generate new recaps or view past ones
          </span>
      </div>

      <div className = 'sm:col-span-3 sm:col-start-1  sm:row-start-3 sm:row-span-10'>
          <FileUploader />
          <div className = 'flex justify-center text-sm pt-10 place-content-center'>
              <AnimatedButton>Generate recap!</AnimatedButton>
          </div>
      </div>

      
      <div className = 'sm:col-span-2 sm:col-start-4  sm:row-start-3'>
        <div className=' overflow-auto scrollbar-thin scrollbar-thumb-gray-400  border rounded-2xl max-h-[30vh] bg-slate-900 sm:max-h-[55vh] sm:h-auto sm:row-start-3 text-1xl'>
          <div className = 'p-3 flex  place-content-center overflow-visible'>
            <div className='text-center text-2xl w-full text-gray-200 '>
              My Recaps
            </div>


          </div>
       
          <div className = 'overflow-hidden'>
              <RecapDisplayBox 
              meeting={{
                id: 123,
                title: "None yet waiting for  DB",
                date: "October 30, 2010",
                status: "Completed"
            }} 
            /> 
            <RecapDisplayBox 
              meeting={{
                id: 123,
                title: "How to Train your Dragon",
                date: "March 26, 2010",
                status: "Completed"
            }} 
            /> 
                       <RecapDisplayBox 
              meeting={{
                id: 123,
                title: "Kung Fu Panda",
                date: "May 15, 2008",
                status: "Completed"
            }} 
            /> 
                       <RecapDisplayBox 
              meeting={{
                id: 123,
                title: "None yet waiting for  DB",
                date: "October 30, 2026",
                status: "Completed"
            }} 
            /> 
            
            
          </div>   
        </div>
      </div>
    </div>
  )
} 