import React, { useRef } from 'react'
import lang from '../utils/languageConstatnts'
import { useDispatch, useSelector } from 'react-redux';
import client from '../utils/openai';
import { API_OPTIONS } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const dispatch=useDispatch();
  const langKey=useSelector((store=>store.config.lang));
const searchText=useRef(null);

const searchMovieTMDB= async(movie)=>{
  const data=await fetch("https://api.themoviedb.org/3/search/"+movie+"?include_adult=false&language=en-US&page=1", API_OPTIONS);
  const json=await data.json();
  return json.results;
}

  const handleGptSearchClick=async()=>{

    const gptQuery="Act as a movie recommendation system and suggest some movies for the query:" +searchText.current.value+
    ". Only give me the name of 5 movies, comma separated like the example given ahead. Example: Run, Jab we met, Hera pheri, Hungama, Hulchul";

    const gptResults=await client.chat.completions.create({
      messages: [{ role: 'user', content: gptQuery }],
      model: 'gpt-3.5-turbo',
    });

    if(!gptResults.choices){
      //Error handling
      //<div><h1>Sorry results not found</h1></div>
    }

    console.log(gptResults.choices?.[0]?.message?.content);
    const gptMovies=gptResults.choices?.[0]?.message?.content.split(",");

    const promiseArray=gptMovies.map((movie)=>searchMovieTMDB(movie));//will return 5 promises
    const tmdbResults=await Promise.all(promiseArray);
    dispatch(addGptMovieResult({movieNames:gptMovies, movieResults:tmdbResults}));
  }

  return (
    <div className="pt-[40%] md:pt-[10%] flex justify-center" >
        <form className="w-[90%] md:w-1/2 bg-black grid grid-cols-12 rounded-lg" onSubmit={(e)=>e.preventDefault()}>
            <input ref={searchText} type="text" className="p-4 m-2 h-10 rounded-lg col-span-9" placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="m-2 py-2 px-4 bg-red-700 text-white rounded-lg col-span-3" onClick={handleGptSearchClick}>{lang[langKey].search}</button>
        </form>
    </div>
  )
}

export default GptSearchBar