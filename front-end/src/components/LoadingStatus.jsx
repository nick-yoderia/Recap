import React from "react";

export default function Loading (){
    return (
        <div className = 'flex justify-center items-center text-white outline-2 outline-white text-center rounded-2xl px-9 py-3'>
            <div className = 'w-5 h-5 border-[3px] border-t-blue-500 border-solid rounded-full animate-spin'>
            </div>
             <p className = ' font-senmibold pl-3 text-white'>Generating recap</p>
        </div>
    )
}