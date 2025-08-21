import { useSelector } from "react-redux";
import MovieSlider from "./MovieSlider";

const SearchResult = () => {
  const { gptResults, movies } = useSelector((store) => store.search);
  if (!gptResults) return null;

  return (
    <>
      {gptResults.map((title, index) =>
        movies && movies[index] && movies[index].results && movies[index].results.length > 0 ? (
          <MovieSlider key={title} heading={title} data={movies[index]} />
        ) : null
      )}
    </>
  )
}

export default SearchResult
