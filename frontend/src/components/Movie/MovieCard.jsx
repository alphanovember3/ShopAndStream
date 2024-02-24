import React from 'react'

const MovieCard = ({ movie }) => {

  const MoviePosterPath = 'https://image.tmdb.org/t/p/original'

  return (
    <div className="w-96 shadow-xl image-full rounded-none">
      <figure><img src={`${MoviePosterPath}` + movie.poster_path} alt="Shoes"/></figure>
      <div className="card-body">
        <h2 className="card-title">{movie.original_title}</h2>
        {/* <p>If a dog chews shoes whose shoes does he choose?</p> */}
      </div>
    </div>
  )
}

export default MovieCard 