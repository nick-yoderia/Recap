import {useRef, useState} from "react" 

export default function FileUploader() {
    const uploadRef = useRef(null)
    const [file, setFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handle_click = (e) =>{
        setFile(null)
    }
    const handle_change = (e)=> {
        const curr_file = uploadRef.current.files[0]
        if(check_file_type(curr_file))
            setFile(curr_file)
        else 
            alert("Error: Invalid File")
    }
    
    const handleDragOver = (e)=>{
        // because by default blocks for safety 
        e.preventDefault()
    }

    const handleDrop = (e)=>{
        e.preventDefault()
        const curr_file = (e.dataTransfer.files[0])
        if(check_file_type(curr_file))
            setFile((e.dataTransfer.files[0]))
        else 
            alert("Error: Invalid File")

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
                // user uploads file 
                onChange={handle_change}
                onClick={handle_click}
            />
            <h2 
            className='place-content-center'>{file&&file.name || 'Drag and drop meeting here'}
            </h2>
        </div>

    )
}

