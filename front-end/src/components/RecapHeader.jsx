import {Link} from 'react-router-dom'
export default function RecapHeader() {
  return (
      <nav className=" w-full bg-slate-950 font-sans h-10 text-white text-sm border-b border-white/20">
        <div className="font-bold max-w-7xl mx-auto flex justify-between">
          {/*add logo on left later? */}
          <h1 className="text-left text-2xl flex place-item-center">
            <Link to='/'>
              recap
            </Link>
          </h1>

          <div className = "text-right py-2 flex">
            <div  
              onClick={() => alert("TODO: Dark/Light mode")} className = "hover:opacity-60" 
            >  
              settings 
            </div>
            <div className = "hover:opacity-60" > 
         
            </div>
          </div>
        </div>
      </nav>
    )
}