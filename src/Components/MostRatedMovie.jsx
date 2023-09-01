import { Carousel } from "@mantine/carousel";
import { Badge, Button, Rating, Text } from "@mantine/core";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import CarouselItems from "./CarouselItems";

const MostRatedMovie = () => {
  const { movies } = useSelector((state) => state.movieSlice);
  const mostRatedMovie = movies?.filter((movie) => movie.vote_average > 7.5);
  console.log(mostRatedMovie);
  return (
    <Carousel
      className=" w-[94%] h-[500px] "
      mx="auto"
      nextControlIcon={
        <BsCaretRightFill
          className=" rounded-[50%] w-full h-full"
          size={50}
          color="red"
        />
      }
      previousControlIcon={
        <BsCaretLeftFill className="text-2xl " size={50} color="red" />
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
