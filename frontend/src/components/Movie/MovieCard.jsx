import React from 'react'
// import { Link } from 'react-router-dom'
import coin from '../../assets/coin.png'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

const MovieCard = ({ movie, selectMovie }) => {

  // const MoviePosterPath = 'https://image.tmdb.org/t/p/original'
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w342"

  return (

    <div onClick={() => selectMovie(movie)} className={"movie"}>
      <div className="movie-title">
          {movie.poster_path &&
          <img src={IMAGE_PATH + movie.poster_path} alt={movie.title}/>
          }
          <div className={"flex between movie-infos"}>
              {/* <img src={coin} alt="coni" height={}/> */}
              <MonetizationOnIcon sx={{ color : '#ffff00'}} fontSize='medium'/>
              <h5 className='text-yellow-200 text-xl'>100</h5>
              {/* {movie.vote_average ? <span className={"movie-voting"}>{movie.vote_average}</span> : null} */}
          </div>
      </div>
    </div>
  )
}

export default MovieCard 