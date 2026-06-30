import SearchResult from "../components/SearchResult";
import { useEffect, useState } from "react";
import GptSearchBar from "../components/GptSearchBar";

const Search = () => {
  const [skinOpacity, setSkinOpacity] = useState(1);
  const [searchOpacity, setSearchOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 70;

      setSkinOpacity(scrollPosition < threshold ? 1 - scrollPosition / threshold : 0);
      setSearchOpacity(scrollPosition >= threshold ? 1 : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="search-page">
      <div className={`bg-skin w-full h-[430px] absolute top-0 -z-0 bg-gradient-to-b from-indigo-800 to-[#141414] transition-colors`} style={{ opacity: `${skinOpacity}` }}></div>
      <div className="search relative">
        <GptSearchBar searchOpacity={searchOpacity} />
        <div className="mt-3 px-4 md:px-12 py-3 min-h-[700px]">
          <SearchResult />
        </div>
      </div>
    </div>

  )
}

export default Search;
