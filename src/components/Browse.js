import Header from './Header';
import useMovie from '../hooks/useMovie';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  
  useMovie('now_playing', 'nowPlayingMovies');
  useMovie('popular', 'popularMovies');
  useMovie('top_rated', 'topRatedMovies');
  useMovie('upcoming', 'upcomingMovies');

  return (
    <div>
      <Header />
      {showGptSearch ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  );
}

export default Browse