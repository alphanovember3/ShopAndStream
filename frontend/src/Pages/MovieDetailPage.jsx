import React from 'react'
import { useParams } from 'react-router-dom'

const MovieDetailPage = () => {

  const { id } = useParams();
  console.log(id);
  return (
    <div className='py-20'>{id}</div>
  )
}

export default MovieDetailPage