import SwiperCore from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import MovieCard, { WithTrending } from './MovieCard';

SwiperCore.use([Navigation, Pagination]);

const MovieSlider = ({ type, heading, data }) => {
  const TrendingMovieCard = WithTrending(MovieCard);

  if (!data) return null;
  const movies = data.results;

  return (
    <div className="movie-slider mb-8">
      <h4 className='mb-3 text-[20px] text-[#e5e5e5]'>{heading}</h4>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={16}
        slidesPerGroup={1}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper flex overflow-visibleF"
      >
        {
          movies.map((movie, index) => (
            <SwiperSlide key={movie.id} className={`${type === 'trending' ? 'w-52' : 'w-28 md:w-36'} cursor-pointer flex-grow-0 flex-shrink-0 overflow-hidden rounded`}>
              {type === 'trending' ? <TrendingMovieCard index={index + 1} data={movie} /> : <MovieCard data={movie} />}
            </SwiperSlide>)
          )
        }
      </Swiper>
    </div>
  )
}

export default MovieSlider
