import {Link} from 'react-router-dom'
export default function RecapHeader() {
  return (
      <nav className=" w-full bg-slate-950 px-5 py-2 text-white text-2xl outline-white outline-[0.5px] ">
        <div className="font-bold px-3 py-2 max-w-7xl mx-auto flex justify-between">
          {/*add logo on left later? */}
          <h1 className="text-left text-3xl">
            <Link to='/'>recap</Link>
          </h1>
          <div className = "text-right space-x-15 flex justify_end ">
            <div onClick={() => alert("TODO: Dark/Light mode")} className = "hover:opacity-60" >  settings </div>
            <div className = "hover:opacity-60" > 
              <Link to="/About">about</Link>
            </div>
          </div>
        </div>
      </nav>
    )
}