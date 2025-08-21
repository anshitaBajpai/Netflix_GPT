import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMDB_API_URL, TMDB_OPTIONS } from "../services/tmdb";
import { setMovie } from '../stores/moviesSlice';


const useMovie = (endpoint, movieState, genreId, originalLanguage) => {
  const dispatch = useDispatch();
  const fetchData = async () => {
    try {
      let apiUrl = `${TMDB_API_URL}/discover/movie?language=en-US&page=1&adult=true`;

      if (genreId) {
        apiUrl += `&with_genres=${genreId}`;
      }

      if (originalLanguage) {
        apiUrl += `&with_original_language=${originalLanguage}`;
      }

      const response = await fetch(apiUrl, TMDB_OPTIONS);
      const result = await response.json();
      dispatch(setMovie({ movieState, movieData: result }))
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])
}

export default useMovie;
