import {useRef, useState} from "react" 


export default function FileUploader({ fileSelect, disabled}) {
    const uploadRef = useRef(null)
    const [file, setFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handle_click = (e) =>{
        setFile(null)
    }
    const handle_change = (e)=> {
        const selectedFile = uploadRef.current.files[0]
        setFile(selectedFile)
        //fileSelect(selectedFile)
        const curr_file = uploadRef.current.files[0]
        if(check_file_type(curr_file)){
            selectedFile ? fileSelect(selectedFile) : 
            
            setFile(curr_file)
        }
        else {
            setFile(null)
            alert("Error: Invalid File")
        }
            
    }
    
    const handleDragOver = (e)=>{
        // because by default blocks for safety 
        e.preventDefault()
        const curr_file = (e.dataTransfer.files[0])
        if(check_file_type(curr_file))
            setFile((e.dataTransfer.files[0]))
        else {
            alert("Error: Invalid File")
            setFile(null)
        }
           
    }

    const handleDrop = (e)=>{
        e.preventDefault()

        const selectedFile = e.dataTransfer.files[0]
        setFile(selectedFile)
        //fileSelect(selectedFile)
    }

    const check_file_type = (curr_file) => {
        return curr_file.type.startsWith('video') || curr_file.type.startsWith('audio')
    }   

    return (
        <div
            className='sm:w-full sm:mx-auto flex justify-center text-white 
                    rounded-2xl outline-2 outline-white outline-dotted hover:opacity-70 overflow-hidden
                    cursor-pointer max-h-[45vh] h-full bg-slate-900'

            onClick={()=> uploadRef.current.click()}

            onDragOver={handleDragOver}
            // user dropped a file 
            onDrop={handleDrop}
            onDragLeave={() => setIsDragOver(false)}

        >
            <input 
                ref={uploadRef} type='file' 
                className='hidden' 
                disabled={disabled}
                // user uploads file 
                onChange={handle_change}
                onClick={handle_click}
            />

            <h2 
            className='text-center flex flex-col place-content-center'>{file&&file.name || 'Choose a file or drag & drop it here'}
               <div className='flex flex-col  text-white/50  text-center'>
                    Audio and video formats (e.g., MP3, WAV, MP4, MOV)                   
                </div>
            </h2>
          

        </div>

    )
}

