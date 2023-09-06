import { Badge, Button, Rating, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { easeIn, easeInOut, motion } from "framer-motion";

const CarouselItems = (props) => {
  const data = props;
  const nav = useNavigate();
  return (
    <motion.div
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
      <motion.div className=" flex flex-col gap-3 justify-end p-5 md:p-10 items-start m-0 z-[-5] h-full bg-[rgba(0,0,0,0.67)] ">
        <div className="shadow-xl md:ms-3 md:mb-2 md:w-[150px] w-[130px] mx-auto mb-5">
          <img src={"https://image.tmdb.org/t/p/w300" + data?.poster_path} />
        </div>

        <motion.h1
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5, easeInOut }}
          className=" text-white flex items-center gap-3 tracking-wider flex-wrap  font-bold text-2xl"
        >
          {data?.title}
          <Badge
            color="violet"
            variant="filled"
            className="display-block  text-gray-100   tracking-wider text-sm font-bold"
          >
            {data?.release_date?.substring(0, 4)}
          </Badge>
        </motion.h1>
        <Text
          className=" text-gray-200 display-none text-sm font-semibold first-letter:capitalize tracking-wider mb-2"
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
      </motion.div>
    </motion.div>
  );
};

export default CarouselItems;
