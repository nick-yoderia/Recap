import SideBar from "../components/SideBar"

export default function Summary() {
    return(
        <div className = 'pt-5'> 
            <div className = 'w-full bg-slate-900 p-5 border-white/20 border font-sans'>
                <span className =' text-3xl '>Kung Fu Panda</span>
            </div>
            
            <div className = 'grid grid-cols-5'>
                <div className='col-start-1 col-span-1 pt-5'>
                    <SideBar/>

                </div>
                

                <div className='col-start-2 col-span-4 pl-5 pt-5'>
                    <div className=' overflow-auto scrollbar-thin scrollbar-thumb-gray-400  border rounded-2xl max-h-[50vh] bg-slate-900  sm:h-full 
                    sm:row-start-3 text-1xl p-5 text-md'>
                        <div className = 'p-3 flex  place-content-center'>
                            Summary 
                        </div>
                        Kung Fu Panda (2008) is about a clumsy, food-loving panda named Po who dreams of becoming a kung fu master.
                        Po unexpectedly gets chosen as the Dragon Warrior, the greatest kung fu fighter destined to protect the Valley of Peace. However, nobody believes he is worthy of the title, including the Furious Five and their teacher, Master Shifu.
                        At first, Po struggles with training because he is overweight, uncoordinated, and inexperienced. But Shifu eventually discovers that Po learns best when motivated by food. With hard work and determination, Po becomes a skilled fighter.
                        Meanwhile, an evil snow leopard named Tai Lung escapes prison and returns to challenge the kung fu masters and claim the Dragon Scrole. 
                        In the final battle, Po faces Tai Lung and discovers that the Dragon Scroll has no secret power. Instead, its message is that believing in yourself is what makes you special.
                        Po defeats Tai Lung and saves the Valley of Peace.Main message: You don't have to be perfect or fit someone else's expectations to achieve greatness. Believe in yourself, work hard, and embrace who you are. 🐼

                    </div>

                </div>
            </div>
         
       
      
          
        </div> 
    )
}