import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"

export default function UploadScreen () {

    return (
    <div className = 'grid grid-cols-3 gap-4 h-screen'>

      <div className = 'col-span-2 col-start-2 self-center'>
          <FileUploader />
          <div className = 'flex justify-center pt-10'>
              <AnimatedButton>Submit</AnimatedButton>
          </div>
      </div>

          
    </div>
  )
} 