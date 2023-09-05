import { Badge, Card, Group, Image, Text } from "@mantine/core";
import React from "react";
import "../Style/movieCard.css";
import { easeInOut, motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

const MovieCard = (prop) => {
  const movieDatas = prop;
  const nav = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      onClick={() => {
        nav("/detail", { state: prop.id });
      }}
      className=" respon-width rounded-lg border-none overflow-hidden   transition cursor-pointer shadow-lg hover:scale-[1.05]  w-[160px] sm:w-[200px] bg-black"
    >
      <Card.Section>
        <Image
          src={"https://image.tmdb.org/t/p/w300" + movieDatas?.backdrop_path}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group className=" p-2 ">
        <Text className=" uppercase title-font truncate text-white text-lg tracking-wider font-bold">
          {movieDatas?.title}
        </Text>
      </Group>
      <div className=" my-2 px-2 d-none">
        <Badge
          color="violet"
          variant="filled"
          className=" text-gray-200 tracking-wider text-xs font-bold"
        >
          {movieDatas?.release_date?.substring(0, 4)}
        </Badge>
      </div>

      <Text
        className=" px-2 d-none text-gray-200 first-letter:capitalize tracking-wider mb-2"
        size="sm"
        color="white"
      >
        {movieDatas?.overview.substring(1, 45)}....
      </Text>
      <div className="px-3 border-t-2 pt-1 mb-3 flex justify-between items-center">
        <h2 className=" text-white text-sm">Rating :</h2>
        <h2 className="  text-red-400 font-bold text-sm">
          {movieDatas?.vote_average}
        </h2>
      </div>
    </motion.div>
  );
};

export default MovieCard;
