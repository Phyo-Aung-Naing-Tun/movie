import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, getMoviesGenres } from "../Redux/Services/movieSlice";
import MovieCard from "../Components/MovieCard";
import MostRatedMovie from "../Components/MostRatedMovie";
import { Loader } from "@mantine/core";

const HomePage = () => {
  const [isloading, setIsLoading] = useState(true);

  useEffect(() => {
    fetching();
  }, []);
  const { movies } = useSelector((state) => state.movieSlice);
  const dispatch = useDispatch();
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWM5NzAyMzE5MjljMzZhOGRhNzZmYTllZDMyNDU3ZSIsInN1YiI6IjY0YWQ4OTRmM2UyZWM4MDEyZWU1NWFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GGUOOrMPOll0GZipykN2dgh3pQzgL1Mwa06Uorwxbh8",
    },
  };

  const fetching = async () => {
    const api = await fetch(
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
      options
    );
    const apiMovieGenres = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    const data = await api.json();
    const { genres } = await apiMovieGenres.json();
    dispatch(getMovies(data?.results));
    dispatch(getMoviesGenres(genres));
    setIsLoading(!isloading);
  };

  if (isloading) {
    return (
      <div className=" min-w-full h-screen  justify-center items-center flex">
        <Loader color="dark" size="lg" variant="bars" />
      </div>
    );
  } else {
    return (
      <div>
        <h1 className=" text-2xl font-bold text-gray-500 italic text-center  my-5">
          Most Rated Movies
        </h1>
        <MostRatedMovie />

        <h1 className=" text-2xl font-bold text-gray-500 italic text-center  my-5">
          All New Released Movies
        </h1>
        <div className=" my-10 flex items-center  w-full flex-wrap justify-center gap-10">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    );
  }
};

export default HomePage;
