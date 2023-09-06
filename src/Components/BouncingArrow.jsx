import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
const BouncingArrow = () => {
  return (
    <div
      onClick={() => {
        scrollTo(1, 1);
      }}
      className=" w-7 rounded-[50%]   h-7 shadow-lg animate-bounce fixed bottom-10 bg-white right-1"
    >
      <FaArrowAltCircleUp className="w-full text-blue-400 h-full" />
    </div>
  );
};

export default BouncingArrow;
