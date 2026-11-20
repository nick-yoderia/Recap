import {Link} from 'react-router-dom'
import homepage from "../images/homepage.png"
import new_summary from '../images/new_summary.svg'
import summary from '../images/summary.svg'
import pdf from '../images/pdf.svg'
export default function Sidebar({meeting}) {

    return(
        <div className = 'flex flex-col  min-h-[calc(100dvh-40px)] h-full bg-slate-950'>
            <div className = 'w-20 md:w-64'>
                <div className= "flex justify-between items-center border-b p-3 border-white/20 ">
                    <h2 className= "text-lg  font-bold "> {meeting.title}</h2>
                </div>

                <nav className="mt-4 text-sm">
                    <ul>
                        <li className=''>
                             <Link to='/Summary' state={{ meeting: meeting,  display: {content: meeting.summary, title:'Summary'}}} className='flex items-center p-4 hover:bg-gray-700 rounded-2xl cursor-pointer' > 
                                <img src={summary} className='size-6 shrink-0 object-contain'/>
                                <span className = 'ml-4 md:block'>Summary</span>
                            </Link>    
                        </li>

                        <li className=''>
                             <Link to='/Summary' state={{ meeting: meeting,  display: {content: meeting.transcript, title:'Transcript'}}} className='flex items-center p-4 hover:bg-gray-700  rounded-2xl cursor-pointer' > 
                                <img src={summary} className='size-6 shrink-0 object-contain'/>
                                <span className = 'ml-4 md:block'>Transcript</span>
                            </Link>    
                        </li>

                        <li className='flex items-center p-4 hover:bg-gray-700  rounded-2xl cursor-pointer' onClick ={ () => alert("Send request for PDf")}>
                            <img src={pdf} className='size-6 shrink-0 object-contain'/>
                             <span className = 'ml-4 md:block'>Export to PDF</span>
                        </li>

                        <li className='flex items-center p-4 hover:bg-gray-700  rounded-2xl cursor-pointer' onClick ={ () => alert("Send request for new summary")}>
                            <img src={new_summary} className='size-6 shrink-0 object-contain'/>
                            <span className = 'ml-4 md:block'>New Summary</span>
                        </li>
                        
                        <li className = 'mt-auto'>
                            <Link to='/' className='flex items-center p-4 hover:bg-gray-700  rounded-2xl cursor-pointer' > 
                                <img src={homepage} className='size-6 shrink-0 object-contain'/>
                                <span className = 'ml-4 md:block'>Home</span>
                            </Link>
                        </li>

                    </ul>
                </nav>
            </div>
        </div>
    )
}