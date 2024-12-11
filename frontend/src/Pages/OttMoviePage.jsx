import React, { useState } from "react";
import axios from "axios";
import MovieCard from "../components/Movie/MovieCard";
import Youtube from "react-youtube";
import Modal from "react-modal";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

Modal.setAppElement("#root");

const OttMoviePage = () => {
  const MOVIE_API = "https://api.themoviedb.org/3/";
  // const SEARCH_API = MOVIE_API + "search/movie"
  const DISCOVER_API = MOVIE_API + "discover/movie";
  const API_KEY = "d07207a19f31f13d768cf3f90cda672f";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/w1280";

  const [movies, setMovies] = useState([]);
  const [playing, setPlaying] = useState(false);
  const [trailer, setTrailer] = useState(null);
  // const [searchKey, setSearchKey] = useState("")
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [isModalOpen, setIsModalOpen] = useState(false);

  // getting user
  const { userInfo } = useSelector((state) => state.auth);

  const redemCoins = async () => {
    try {
      const requestBody = {
        userId: userInfo._id,
      };

      const response = await fetch("http://localhost:5001/api/users/redeme", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const res = await response.json();

      if (res.message === "No Sufficent Reward Coins") {
        // toast.error("No Balance");
        return false;
      } else {
        console.log(res);

        return true;
      }
    } catch (error) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    document.title = "Netli";
    fetchMovieData();
  }, []);

  // fetching movie data:
  const fetchMovieData = async (event) => {
    if (event) {
      event.preventDefault();
    }

    try {
      const { data } = await axios.get(`${DISCOVER_API}`, {
        params: {
          api_key: API_KEY,
          // query: searchKey
        },
      });
      console.log(data.results);
      setMovies(data.results);
      setMovie(data.results[0]);

      if (data.results.length) {
        await fetchMovieData(data.results[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMovie = async (id) => {
    const { data } = await axios.get(`${MOVIE_API}movie/${id}`, {
      params: {
        api_key: API_KEY,
        append_to_response: "videos",
      },
    });

    if (data.videos && data.videos.results) {
      const trailer = data.videos.results.find(
        (vid) => vid.name === "Official Trailer"
      );
      setTrailer(trailer ? trailer : data.videos.results[0]);
    }

    setMovie(data);
  };

  const selectMovie = (movie) => {
    fetchMovie(movie.id);
    setPlaying(false);
    setMovie(movie);
    window.scrollTo(0, 0);
  };

  const renderMovies = () =>
    movies.map((movie) => (
      <MovieCard selectMovie={selectMovie} key={movie.id} movie={movie} />
    ));

  const handleFullScreenChange = (event) => {
    setIsFullScreen(event.isFullscreen);
  };

  return (
    <div className="ott">
      {movies.length ? (
        <main>
          {movie ? (
            <div
              className="poster"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${BACKDROP_PATH}${movie.backdrop_path})`,
              }}
            >
              {playing ? (
                <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
                  contentLabel="Video Modal"
                >
                  <Youtube
                    videoId={trailer.key}
                    className={"youtube amru"}
                    containerClassName={"youtube-container amru"}
                    opts={{
                      width: "100%",
                      height: "600",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                        rel: 0,
                        showinfo: 0,
                      },
                    }}
                  />
                  <button
                    onClick={() => {
                      closeModal();
                      setPlaying(false);
                    }}
                    className={"button close-video"}
                  >
                    Close
                  </button>
                </Modal>
              ) : (
                <div className="center-max-size">
                  <div className="poster-content">
                    {trailer ? (
                      <button
                        className={"button play-video"}
                        onClick={async () => {
                          // after user played the video then
                          // specific amount of coins will be debited from the user
                          // for this use post method:
                          // that send two parameters : number of coin and userId
                          // number of coins for now is default 200:
                          const result = await redemCoins();
                          console.log(result);

                          if (result) {
                            // after redeme the video will play
                            openModal();
                            setPlaying(true);
                          } else {
                            toast.error("No Reward Points");
                          }
                        }}
                        type="button"
                      >
                        Play Now
                      </button>
                    ) : (
                      "Sorry, no trailer available"
                    )}
                    <h1 className="text-6xl text-gray-400">{movie.title}</h1>
                    <p className="text-l text-gray-400">{movie.overview}</p>
                  </div>
                </div>
              )}
            </div>
          ) : null}

          <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 justify-items-center pt-10 bg-black">
            {renderMovies()}
          </div>
        </main>
      ) : (
        "Sorry, no movies found"
      )}
    </div>
  );
};

export default OttMoviePage;
