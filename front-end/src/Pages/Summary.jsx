import SideBar from "../components/SideBar"
import { useLocation } from "react-router-dom";

export default function Summary() {
    const location = useLocation();
    const meeting = location.state?.meeting
    const display = location.state?.display
    return(
        <div className = 'p-3 lg:pt-5 font-sans text-[#FAF9F6]'> 
            <div className = 'w-full bg-slate-900 rounded-2xl p-5 xl:pt-5 xl:pb-5 border-white/20 border font-sans'>
                <span className =' text-2xl  font-semibold'>{meeting.title}</span>
            </div>
            
            <div className = 'grid grid-cols-7'>
                <div className='col-start-1 col-span-1 pt-3'>
                    <SideBar meeting={meeting}/>
                </div>
                

                <div className='col-start-2 col-span-6 pl-5 md:text-bold pt-3'>
                    <div className=' overflow-auto scrollbar-thin scrollbar-thumb-gray-400 h-fit border rounded-2xl sm:max-h-[calc(100dvh-200px)] bg-slate-900  sm:h-full 
                        sm:row-start-3 text-1xl p-3 text-md'>
                        <div className = 'p-3 flex  underline md:text-4xl lg:text-10xl place-content-center'>
                            Summary
                        </div>
                        <div className = 'text-lg'>
                            {display}    
                        </div>               
                    </div>
                </div>
            </div>
          
        </div> 
    )
}