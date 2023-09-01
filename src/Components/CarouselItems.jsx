import { Badge, Button, Rating, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";

const CarouselItems = (props) => {
  const data = props;
  const nav = useNavigate();
  return (
    <div
      style={{
        background: ` url(${
          "https://image.tmdb.org/t/p/w300" + data?.backdrop_path
        })`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
      className="  shadow-xl rounded-xl  md:w-[80%] mx-auto overflow-hidden h-[500px]  bg-slate-300"
    >
      <div className=" flex flex-col gap-3 justify-end p-5 md:p-10 items-start w-full z-[-5] h-full bg-[rgba(0,0,0,0.47)] ">
        {" "}
        <h1 className=" text-white tracking-wider font-bold text-2xl">
          {data?.title}
          <Badge
            color="violet"
            variant="filled"
            className=" text-gray-100  ms-5 tracking-wider text-sm font-bold"
          >
            {data?.release_date?.substring(0, 4)}
          </Badge>
        </h1>
        <Text
          className=" text-gray-200 text-sm font-semibold first-letter:capitalize tracking-wider mb-2"
          color="white"
        >
          {data?.overview.substring(1, 100)}....
        </Text>
        <Rating
          className=" bg-black p-1 rounded-lg"
          value={data?.vote_average - 3}
          readOnly
        />
        <Button
          onClick={() => {
            nav("/detail", { state: data?.id });
          }}
          className="text-white  mt-2 tracking-wider  text-lg font-semibold border border-white"
          variant="outline"
        >
          Detail
        </Button>
      </div>
    </div>
  );
};

export default CarouselItems;
