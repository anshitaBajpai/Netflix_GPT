
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { TMDB_API_URL, TMDB_OPTIONS } from "../services/tmdb";
import { setShowCase } from '../stores/showCaseSlice';

const useShowCase = (endpoint, showCaseState, genreId, originalLanguage, showIndex = 0) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${TMDB_API_URL}/discover/movie?language=en-US&page=1`;

        if (genreId) {
          apiUrl += `&with_genres=${genreId}`;
        }

        if (originalLanguage) {
          apiUrl += `&with_original_language=${originalLanguage}`;
        }

        const response = await fetch(apiUrl, TMDB_OPTIONS);
        const result = await response.json();

        const showCaseFilter = result.results[showIndex];

        const videoResponse = await fetch(`${TMDB_API_URL}/movie/${showCaseFilter.id}/videos?language=en-US&page=1`, TMDB_OPTIONS);
        const videoResult = await videoResponse.json();

        const showCaseResult = {
          info: showCaseFilter,
          videos: videoResult
        };

        dispatch(setShowCase({ showCaseState, showCaseData: showCaseResult }));
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchData();
  }, [dispatch, endpoint, showCaseState, genreId, originalLanguage, showIndex]);
};

export default useShowCase;
