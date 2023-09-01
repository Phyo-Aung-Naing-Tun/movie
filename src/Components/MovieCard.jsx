import { Badge, Card, Group, Image, Text } from "@mantine/core";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const MovieCard = (prop) => {
  const movieDatas = prop;
  const nav = useNavigate();
  return (
    <Card
      onClick={() => {
        nav("/detail", { state: prop.id });
      }}
      className=" shadow-lg hover:scale-[1.1] transition w-[80%]  md:w-[200px] bg-black"
      padding="md"
      radius="md"
      withBorder
    >
      <Card.Section>
        <Image
          src={"https://image.tmdb.org/t/p/w300" + movieDatas?.backdrop_path}
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group className="mt-3">
        <Text className=" uppercase truncate text-white text-lg tracking-wider font-bold">
          {movieDatas?.title}
        </Text>
      </Group>
      <div className=" my-2">
        <Badge
          color="violet"
          variant="filled"
          className=" text-gray-200 tracking-wider text-xs font-bold"
        >
          {movieDatas?.release_date?.substring(0, 4)}
        </Badge>
      </div>

      <Text
        className=" text-gray-200 first-letter:capitalize tracking-wider mb-2"
        size="sm"
        color="white"
      >
        {movieDatas?.overview.substring(1, 55)}....
      </Text>
      <div className=" border-t-2 pt-1 flex justify-between items-center">
        <h2 className=" text-white text-sm">Rating :</h2>
        <h2 className="  text-red-400 font-bold text-sm">
          {movieDatas?.vote_average}
        </h2>
      </div>
    </Card>
  );
};

export default MovieCard;
