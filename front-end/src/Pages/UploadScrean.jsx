import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"

export default function UploadScreen () {

    return (
    <div className = 'flex flex-col text-2xl space-y-15 center'>
      <div className= 'text-5xl pt-25 font-semibold text-center' > 
        welcome to recap
      </div>
          <FileUploader />
          <div className= "flex justify-center" onClick={() => console.log("TODO: Send File to backend")}>
            <AnimatedButton>Submit</AnimatedButton>
          </div>
    </div>
  )
} 