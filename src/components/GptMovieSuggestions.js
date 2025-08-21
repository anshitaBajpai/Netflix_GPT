import React from 'react'
import { useSelector } from 'react-redux'
import MovieList from './MovieList'

const GptMovieSuggestions = () => {
  const {movieNames,movieResults}=useSelector(store=>store.gpt);
  if(!movieNames) return null;
  return (
    <div className="p-10 m-10 bg-black text-white opacity-80">{movieNames}
      <div>
        <h1>{movieNames[0]}</h1>
        {movieNames.map((movieName, index) => (
          <MovieList key={movieName} title={movieName} movies={movieResults[index]} />
        ))}
      </div>
    </div>
  )
};

export default GptMovieSuggestions;