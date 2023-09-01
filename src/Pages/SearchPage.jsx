import React from "react";
import { useSelector } from "react-redux";
import MovieCard from "../Components/MovieCard";

const SearchPage = () => {
  const { searchTearms, movies } = useSelector((state) => state.movieSlice);

  return (
    <div className=" min-w-full flex flex-wrap justify-center items-center my-10 gap-10">
      {movies
        ?.filter((movie) =>
          movie.original_title
            ?.toLowerCase()
            .includes(searchTearms.toLowerCase())
        )
        .map((item) => (
          <MovieCard key={item.id} {...item} />
        ))}
    </div>
  );
};

export default SearchPage;
