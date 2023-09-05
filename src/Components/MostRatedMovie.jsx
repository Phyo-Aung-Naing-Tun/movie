import { Carousel } from "@mantine/carousel";
import React from "react";
import { useSelector } from "react-redux";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import CarouselItems from "./CarouselItems";
import "../Style/mostRatedCarousel.css";

const MostRatedMovie = () => {
  const { movies } = useSelector((state) => state.movieSlice);
  const mostRatedMovie = movies?.filter((movie) => movie.vote_average > 7.5);
  return (
    <Carousel
      className="  h-[500px] "
      nextControlIcon={
        <BsCaretRightFill className=" control-bg-white width-30 " size={50} />
      }
      previousControlIcon={
        <BsCaretLeftFill className="control-bg-white width-30" size={50} />
      }
    >
      {mostRatedMovie?.map((item) => {
        return (
          <Carousel.Slide key={item.id}>
            <CarouselItems {...item} />
          </Carousel.Slide>
        );
      })}
    </Carousel>
  );
};

export default MostRatedMovie;
