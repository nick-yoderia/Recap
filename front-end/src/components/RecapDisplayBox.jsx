

export default function RecapDisplayBox ({ meeting }){
    return (
        <div className="text-white bg-slate-800 border border-b-blue-50
        rounded-3xl hover:opacity-85 p-5 flex flex-col"

        onClick = {()=> console.log("Send GET request for meeting ID")}
        >
            <div className="flex flex-row">
                { meeting.title }
            </div>
            <div className="flex">
                { meeting.date }
            </div>
    
            <div className = 'flex flex-row justify-between'>
                Status: {meeting.status }
                <button className = 'flex  text-xs place-content-end outline-1 rounded-2xl'>
                    <span className = 'text-center p-2' >
                        Delete
                    </span>
                </button>
            </div>       
        </div>
    )
}