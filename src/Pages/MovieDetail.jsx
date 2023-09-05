import { Badge, Button, Image, Loader, Rating } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import ReviewModal from "../Components/ReviewModal";
import { useDispatch } from "react-redux";
import { motion } from "framer-motion";

import { addReviews } from "../Redux/Services/movieSlice";

const MovieDetail = () => {
  const [singleMovie, setSingleMovie] = useState({});
  const [isloading, setIsLoading] = useState(true);
  const { state: id } = useLocation();
  const dispatch = useDispatch();
  useEffect(() => {
    fetching();
  }, []);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWM5NzAyMzE5MjljMzZhOGRhNzZmYTllZDMyNDU3ZSIsInN1YiI6IjY0YWQ4OTRmM2UyZWM4MDEyZWU1NWFkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GGUOOrMPOll0GZipykN2dgh3pQzgL1Mwa06Uorwxbh8",
    },
  };
  const fetching = async () => {
    const api = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
      options
    );
    const reviewapi = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`,
      options
    );
    const data = await api.json();
    const reviewDatas = await reviewapi.json();

    dispatch(addReviews(reviewDatas.results));
    setSingleMovie(data);
    setIsLoading(false);
  };

  if (isloading) {
    return (
      <div className=" min-w-full h-screen  justify-center items-center flex">
        <Loader color="dark" size="lg" variant="bars" />
      </div>
    );
  } else {
    return (
      <div className=" w-full min-h-full">
        <motion.div className="    backimg h-screen flex py-10 flex-wrap justify-center gap-10 min-w-full items-center ">
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className=" w-[250px] shadow-lg"
          >
            <img
              className=" w-full"
              src={"https://image.tmdb.org/t/p/w200" + singleMovie?.poster_path}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className=" w-full p-6 md:w-[500px]"
          >
            <motion.h1
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              className=" text-gray-500 font-bold text-3xl"
            >
              {singleMovie?.title}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className=" flex flex-wrap justify-start gap-2 items-center my-4"
            >
              <Badge
                key={1}
                className=" lowercase"
                variant="filled"
                color="dark"
              >
                {singleMovie.release_date}
              </Badge>
              <Badge
                key={2}
                className=" lowercase"
                variant="filled"
                color="dark"
              >
                {`${parseInt(singleMovie?.runtime / 60)}h ${
                  singleMovie?.runtime % 60
                }min`}
              </Badge>
              {singleMovie.spoken_languages?.map((i) => (
                <Badge
                  key={i.id}
                  className=" tracking-wider"
                  variant="outline"
                  color="dark"
                >
                  {i.english_name}
                </Badge>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.4 }}
              className=" mb-3 text-sm flex-wrap flex gap-2 italic tracking-wider font-semibold"
            >
              {singleMovie.genres?.map((item) => (
                <span key={item.id}>{item.name}</span>
              ))}
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.6 }}
              className=" first-letter:capitalize text-gray-600  tracking-wider leading-6"
            >
              {singleMovie.overview}
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.8 }}
              className=" mt-5 flex-wrap-reverse  flex gap-4"
            >
              <Link to={-1}>
                <Button className="bg-black uppercase tracking-wider ">
                  Back
                </Button>
              </Link>

              <Button
                onClick={() => window.open(singleMovie.homepage)}
                variant="outline"
                color="dark"
                className=" uppercase tracking-wider "
              >
                view Trailers
              </Button>
              <div className=" ms-auto flex justify-center items-center tracking-wider gap-3">
                <Rating value={singleMovie.vote_average - 3} readOnly />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.8 }}
              className=" mt-5"
            >
              <ReviewModal />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  }
};

export default MovieDetail;
