import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMovieSuggestions from './GptMovieSuggestions'
import { BG_IMG_URL } from '../utils/constants'


const GptSearch = () => {



  return (
    <><div className="fixed -z-10 " >
    <img 
    className="h-screen object-cover w-screen"
    src={BG_IMG_URL}
    alt="Background Img"/>
    </div>
    <div className="">
      
      <GptSearchBar/>
    <GptMovieSuggestions/>
    </div></>
  )
}

export default GptSearch