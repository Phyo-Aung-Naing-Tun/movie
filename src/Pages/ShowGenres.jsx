import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../Components/MovieCard";
import { useLocation } from "react-router-dom";
import { Badge } from "@mantine/core";

const ShowGenres = () => {
  const { movies } = useSelector((state) => state.movieSlice);

  const { filterGenresId } = useSelector((state) => state.movieSlice);
  const { state: title } = useLocation();

  const movieDatasToMap = movies?.filter((movie) => {
    if (filterGenresId === null) {
      return movie;
    } else if (filterGenresId) {
      return movie.genre_ids.includes(filterGenresId);
    }
  });

  if (movieDatasToMap.length) {
    return (
      <div>
        <div className=" mt-10 ms-10 w-[150px] h-[35px] md:w-[200px] md:h-[50px]">
          <Badge color="dark" className=" w-full h-full text-xl">
            {title}
          </Badge>
        </div>
        <div className=" my-10 flex items-center  w-full flex-wrap justify-center gap-10">
          {movieDatasToMap?.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <div className=" mt-10 ms-10 w-[200px] h-[50px]">
          <Badge color="dark" className=" w-full h-full text-xl">
            {title}
          </Badge>
        </div>
        <div className=" my-10 flex items-center  w-full flex-wrap justify-center gap-10">
          {movies?.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </div>
      </div>
    );
  }
};

export default ShowGenres;
