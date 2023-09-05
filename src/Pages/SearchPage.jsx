import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

import MovieCard from "../Components/MovieCard";

const SearchPage = () => {
  const { searchTearms, movies } = useSelector((state) => state.movieSlice);

  return (
    <div>
      <motion.div
        layout
        className="
       my-10 flex items-start min-h-screen  w-full flex-wrap justify-center md:gap-10
        "
      >
        {movies
          ?.filter((movie) =>
            movie.original_title
              ?.toLowerCase()
              .includes(searchTearms.toLowerCase())
          )
          .map((item) => (
            <MovieCard key={item.id} {...item} />
          ))}
      </motion.div>
      <footer className=" text-sm  flex justify-center items-center tracking-wider h-10 bg-black text-white mt-5">
        MOVIE &copy; 2023 All Right Reserved
      </footer>
    </div>
  );
};

export default SearchPage;
