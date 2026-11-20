import Sidebar from "../components/SideBar"

import { useLocation } from "react-router-dom";

export default function Summary() {
    const location = useLocation();
    const meeting = location.state?.meeting
    const display = location.state?.display
    return(
        <div className = 'flex min-w-screen bg-linear-to-t from-slate-900 to-[#080e20] font-sans text-white gap-10 '> 
                <div className=''>
                    <Sidebar meeting={meeting}/>
                </div>
            

                <div className='md:text-bold w-full max-w-360 '>
                    <h1 className = 'flex flex-col p-5 text-4xl font-bold text-center '> 
                            {display.title}
                    </h1>
                    <div className=' overflow-auto scrollbar-thin scrollbar-thumb-slate-800 h-fit border-t border-b border-l border-slate-800 sm:max-h-[calc(100dvh-170px)]   sm:h-fit 
                        text-1xl p-3 text-md'>
                    

                        <div className = 'text-lg whitespace-pre-wrap'>
                            {display.content}    
                        </div>               
                    </div>
                </div>
           
          
        </div> 
    )
}