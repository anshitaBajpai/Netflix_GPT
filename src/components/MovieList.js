import React from 'react'
import MovieCard from './MovieCard'

const MovieList = ({title,movies}) => {
 
  return (
    <div className="px-1 ">
      <h1 className="text-2xl py-3 text-cyan-50">{title}</h1>
      <div className="flex overflow-x-scroll">
            
        <div className="flex">
          {movies?.map((movie)=>(
            <MovieCard key={movie.id} posterPath={movie.poster_path}/>
         ))}
        </div> 
      </div>
   </div>
  );
};

export default MovieList;