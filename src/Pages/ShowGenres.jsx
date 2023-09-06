import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieCard from "../Components/MovieCard";
import { useLocation } from "react-router-dom";
import { Badge } from "@mantine/core";
import BouncingArrow from "../Components/BouncingArrow";

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
        <div className=" w-full min-h-screen  ">
          <div className=" mt-10 ms-10 w-[200px] h-[35px] md:w-[200px] md:h-[50px]">
            <Badge
              variant="outline"
              color="dark"
              className=" w-full h-full text-xl"
            >
              {title}
            </Badge>
          </div>
          <div className=" my-10 flex items-center  w-full flex-wrap justify-center md:gap-10">
            {movieDatasToMap?.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
        <footer className="  flex justify-center items-center tracking-wider text-sm  h-10 bg-black text-white mt-5">
          MOVIE &copy; 2023 All Right Reserved
        </footer>
        <BouncingArrow />
      </div>
    );
  } else {
    return (
      <div>
        <div className=" w-full min-h-screen">
          <div className=" mt-10 ms-10 w-[200px] h-[50px]">
            <Badge
              variant="outline"
              color="dark"
              className=" w-full h-full   text-xl"
            >
              {title}
            </Badge>
          </div>
          <div className=" my-10 flex items-center  w-full flex-wrap justify-center md:gap-10">
            {movies?.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
        <footer className="  flex justify-center items-center tracking-wider text-sm  h-10 bg-black text-white mt-5">
          MOVIE &copy; 2023 All Right Reserved
        </footer>
        <BouncingArrow />
      </div>
    );
  }
};

export default ShowGenres;
