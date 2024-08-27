import React from 'react'

const GptSearchBar = () => {
  return (
    <div className="pt-[10%] flex justify-center" >
        <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
            <input type="text" className="p-4 m-2 rounded-lg col-span-9" placeholder="What would you like to watch today?"/>
            <button className="m-2 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3">Search</button>
        </form>
    </div>
  )
}

export default GptSearchBar