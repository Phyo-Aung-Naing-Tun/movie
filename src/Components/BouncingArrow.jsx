import React from "react";
import { FaArrowAltCircleUp } from "react-icons/fa";
const BouncingArrow = () => {
  return (
    <div
      onClick={() => {
        scrollTo(1, 1);
      }}
      className=" w-6 rounded-[50%]   h-6 shadow-lg animate-bounce fixed bottom-10 right-1"
    >
      <FaArrowAltCircleUp className="w-full h-full" />
    </div>
  );
};

export default BouncingArrow;
