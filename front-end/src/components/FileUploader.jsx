import {useRef, useState} from "react" 

export default function FileUploader() {
    const uploadRef = useRef(null)
    const [file, setFile] = useState(null)
    const [isDragOver, setIsDragOver] = useState(false)

    const handle_click = (e) =>{
        setFile(null)
    }
    const handle_change = (e)=> {
        setFile(uploadRef.current.files[0])
    }

    const handleDragOver = (e)=>{
        // because by default blocks for safety 
        e.preventDefault()
        setIsDragOver(true)
    }

    const handleDrop = (e)=>{
        e.preventDefault()
        setFile(e.dataTransfer.files[0])
    }

    return (

        <div
            className='w-full max-w-3xl mx-auto flex justify-center text-white
                    rounded-2xl outline-3 outline-dotted hover:opacity-70 overflow-hidden
                    cursor-pointer min-h-[40vh] bg-slate-900'

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
            <h2 className='place-content-center'>{file&&file.name || 'Upload'}</h2>
        </div>

    )
}

