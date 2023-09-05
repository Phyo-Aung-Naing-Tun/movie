import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies, getMoviesGenres } from "../Redux/Services/movieSlice";
import MovieCard from "../Components/MovieCard";
import MostRatedMovie from "../Components/MostRatedMovie";
import { Loader } from "@mantine/core";
import { motion } from "framer-motion";
import BouncingArrow from "../Components/BouncingArrow";

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
      <div className=" max-w-[100vw] ">
        <motion.h1
          initial={{ x: 100, scale: 0 }}
          whileInView={{ x: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" text-2xl font-bold text-gray-500 italic text-center  my-5"
        >
          Most Rated Movies
        </motion.h1>

        <MostRatedMovie />

        <motion.h1
          initial={{ x: 100, scale: 0 }}
          whileInView={{ x: 0, scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" text-xl md:text-2xl font-bold text-gray-500 italic text-center relative  my-5"
        >
          All New Released Movies
        </motion.h1>
        <motion.div
          layout
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className=" flex  flex-wrap justify-center items-center md:gap-10  "
        >
          {movies?.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
          <BouncingArrow />
        </motion.div>
        <footer className=" flex justify-center items-center tracking-wider text-sm  h-10 bg-black text-white mt-5">
          MOVIE &copy; 2023 All Right Reserved
        </footer>
      </div>
    );
  }
};

export default HomePage;
