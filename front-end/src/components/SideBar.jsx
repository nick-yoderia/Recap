import {Link} from 'react-router-dom'
 
export default function Sidebar({meeting}) {
    return(
    
        <div className = 'h-fit w-full border rounded-2xl border-white/20 font-sans sm:min-h-[calc(100dvh-200px)]  text-slate-300 text-md bg-slate-900 text-left pl-3'>
            
            <Link to='/Summary' state={{ meeting: meeting,  display: meeting.summary}}> 
                <div className = 'py-5 hover:opacity-55'>
                    Summary 
                </div>
            </Link>
            
           
            <Link to='/Summary' state={{ meeting: meeting,  display: meeting.action_items}}> 
                <div className = 'py-5 hover:opacity-55'>
                    Action Items  
                </div>
            </Link>

           
            <Link to='/Summary' state={{ meeting: meeting,  display: meeting.topic_outline}}> 
                <div className = 'py-5 hover:opacity-55'>
                    Topic Outline  
                </div>
            </Link>   
                    
           
            <Link to='/Summary' state={{ meeting: meeting,  display: meeting.key_decisions}}> 
                <div className = 'py-5 hover:opacity-55'>
                    Key Decisions  
                </div>
            </Link>
        
         
        </div> 
      
    )
}