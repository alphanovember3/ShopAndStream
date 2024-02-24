import React from 'react'
import axios from 'axios';
import MovieCard from '../components/Movie/MovieCard';

const OttMoviePage = () => {

  React.useEffect(() => {
    document.title = 'Netli';
    fetchMovieData();
  }, []);

  const [ movies , setMovies] = React.useState([]);

  // fetching movie data:
  const fetchMovieData = async(event) => {
    if (event) {
      event.preventDefault()
    }

    try{
      const { data } = await axios.get('https://api.themoviedb.org/3/discover/movie', {
        params : {
          api_key : 'd07207a19f31f13d768cf3f90cda672f'
        }
      });
      console.log(data.results);
      setMovies(data.results);


    } catch(error) {
      console.log(error);
    }

  }


  return (
    <main className='py-20 bg-black'>
      <div className='grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-items-center'>
        { movies.map((movie) => (
          <MovieCard movie={movie} key={movie.id}/>
        ))}
      </div>
    </main>
  )
}

export default OttMoviePage