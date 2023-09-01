import { Avatar, Badge, Button } from "@mantine/core";
import React, { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

const ReviewPosts = (props) => {
  const [likeToggle, setLikeToggle] = useState();

  const datas = props;
  console.log(datas);

  return (
    <div className=" my-4 ">
      <div className=" mb-3 flex justify-between items-center">
        <div className=" flex items-center gap-2">
          <Avatar color="blue" radius={"xl"} />
          <h1 className=" tracking-wider text-sm font-semibold">
            {datas.author}
          </h1>
        </div>
        <div>
          <Badge>{datas.updated_at.substring(0, 10)}</Badge>
        </div>
      </div>
      <p className=" mb-4 text-[14px] tracking-wider leading-6">
        {datas.content}
      </p>
      <hr />
      <div className=" pb-1 bg-slate-100">
        <Button
          onClick={() => {
            setLikeToggle(!likeToggle);
          }}
          className=" text-2xl"
          variant="dark"
        >
          {likeToggle ? (
            <AiFillLike className=" text-blue-400" />
          ) : (
            <AiOutlineLike />
          )}
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default ReviewPosts;
