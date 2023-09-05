import { TextInput } from "@mantine/core";
import React from "react";
import CatagoriesDrawer from "./CatagoriesDrawer";
import { useDispatch } from "react-redux";
import {
  addFilterGenresId,
  addSearchTearms,
} from "../Redux/Services/movieSlice";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  return (
    <div className="flex w-full flex-wrap gap-3 sticky top-0 z-[9] items-center py-2 shadow-lg justify-evenly bg-white">
      <h1
        onClick={() => {
          dispatch(addFilterGenresId(null));
          nav("/");
        }}
        className="  w-[100px] h-[40px]"
      >
        <img
          className=" w-full h-full object-cover"
          src="https://t3.ftcdn.net/jpg/05/90/75/40/360_F_590754013_CoFRYEcAmLREfB3k8vjzuyStsDbMAnqC.jpg"
        />
      </h1>

      <div className=" flex justify-center items-center gap-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            nav("/search");
          }}
        >
          <TextInput
            onChange={(e) => {
              dispatch(addSearchTearms(e.target.value));
            }}
            variant="filled"
            className=" w-[200px]"
            placeholder="Search "
          />
        </form>

        <CatagoriesDrawer />
      </div>
    </div>
  );
};

export default NavBar;
