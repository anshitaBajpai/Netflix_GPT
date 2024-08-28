import React from 'react'
import lang from '../utils/languageConstatnts'
import { useSelector } from 'react-redux';

const GptSearchBar = () => {

  const langKey=useSelector((store=>store.config.lang));

  return (
    <div className="pt-[10%] flex justify-center" >
        <form className="w-1/2 bg-black grid grid-cols-12 rounded-lg">
            <input type="text" className="p-4 m-2 h-10 rounded-lg col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="m-2 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3">{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar