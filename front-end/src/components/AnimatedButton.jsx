export default function AnimatedButton ({ children }){
    return (
        <button className="text-white bg-slate-800 outline-2 outline-white text-center
        rounded-2xl px-9 py-3 cursor-pointer duration-400 hover:opacity-80 hover:scale-95"
        >
            { children }
        </button>
    )
}