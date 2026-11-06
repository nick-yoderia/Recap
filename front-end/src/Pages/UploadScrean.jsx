import FileUploader from "../components/FileUploader"
import AnimatedButton from "../components/AnimatedButton"
import RecapDisplayBox from "../components/RecapDisplayBox"
import {Link} from 'react-router-dom'

export default function UploadScreen () {
  const meeting_sample = {
    title: "Kung Fu Panda", 
    summary: "Kung Fu Panda (2008) is about a clumsy, food-loving panda named Po who dreams of becoming a kung fu master. Po unexpectedly gets chosen as the Dragon Warrior, the greatest kung fu fighter destined to protect the Valley of Peace. However, nobody believes he is worthy of the title, including the Furious Five and their teacher, Master Shifu. At first, Po struggles with training because he is overweight, uncoordinated, and inexperienced. But Shifu eventually discovers that Po learns best when motivated by food. With hard work and determination, Po becomes a skilled fighter. Meanwhile, an evil snow leopard named Tai Lung escapes prison and returns to challenge the kung fu masters and claim the Dragon Scrole.  In the final battle, Po faces Tai Lung and discovers that the Dragon Scroll has no secret power. Instead, its message is that believing in yourself is what makes you special. Po defeats Tai Lung and saves the Valley of Peace.Main message: You don't have to be perfect or fit someone else's expectations to achieve greatness. Believe in yourself, work hard, and embrace who you are. 🐼 ", 
    action_items: "no action items yet", 
    key_decisions: "no key decisions yet", 
    topic_outline: "no topic outline yet"
  }

  const meetings = [ 
    {
      key: 1, 
      title: "How to Train your Dragon",
      date: "March 26, 2010",
      status: "Completed"
    }, 
    {
      key: 2, 
      title: "Kung Fu Panda",
      date: "May 15, 2008",
      status: "Completed"
    }, 
    {
      key: 3, 
      title: "Up",
      date: "May 29, 2009",
      status: "Complete",
    }, 
    {
      key: 4, 
      title: "The Matrix",
      date: "March 31, 1999",
      status: "Complete",
    }
   ]
    return (
    <div className = 'md:grid  md:grid-cols-5 md:h-screen md:py-5 md:p-0 p-5 md:gap-15 font-sans'>
     
     <div className = 'md:col-span-3 md:col-start-2 md:row-start-1 pt-5 text-center text-3xl md:text-5xl border-b rounded-2xl'>
          Welcome to Recap! 
          <span className = 'md:text-2xl font-mono text-sm flex flex-col py-5 text-light text-teal-100 md:row-start-3 '>
            Generate new recaps or view past ones
          </span>
      </div>

      <div className = 'md:col-span-3 md:col-start-1  md:row-start-3 md:row-span-10 sm:max-h-[calc(100dvh-450px)] pl-2'>
          <FileUploader />
          <div className = 'flex justify-center text-sm pt-10 place-content-center'>
              <AnimatedButton>Generate recap!</AnimatedButton>
          </div>
      </div>

      
      <div className = 'md:col-span-2 md:col-start-4  md:row-start-3 pr-3'>
        <div className=' overflow-auto scrollbar-thin scrollbar-thumb-gray-400  border rounded-2xl  bg-slate-900  sm:h-auto sm:row-start-3 text-1xl sm:max-h-[calc(100dvh-390px)]'>
          <div className = 'p-3 flex  place-content-center ' >
            <div className='text-center text-2xl w-full text-white/90 text-bold '>
              My Recaps
            </div>
          </div>

        <Link to='/Summary' state={{ meeting: meeting_sample,  display: meeting_sample.summary}}> 
          <div className = 'md:overflow-hidden '>
              <RecapDisplayBox 
              meetings = {meetings}
            />
          
             
          </div>   
          </Link>
        </div>
      </div>
    </div>
  )
} 