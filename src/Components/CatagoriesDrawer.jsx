import { Avatar, Burger, Button, Drawer, Group, Loader } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { addFilterGenresId } from "../Redux/Services/movieSlice";
import Cookies from "js-cookie";
import { useGetLogOutMutation } from "../Redux/Api/auth";

const CatagoriesDrawer = () => {
  const [openDrawer, { open, close }] = useDisclosure(false);
  const [toggle, setToggle] = useState(true);
  const { moviesGenres } = useSelector((state) => state?.movieSlice);
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const { user } = useSelector((state) => state.authSlice);
  const token = Cookies.get("token");
  const [user, setuser] = useState({});

  const [getLogOut, { isLoading }] = useGetLogOutMutation();

  const genresHandeller = (e) => {
    dispatch(addFilterGenresId(parseFloat(e.target.id)));
    nav("/genres", { state: e.target.innerText });
    close();
  };
  const logOutHandeller = async () => {
    try {
      const { data } = await getLogOut(token);
      if (data?.success) {
        Cookies.remove("token");
        Cookies.remove("user");
        nav("/login");
        close();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Drawer size={"250px"} opened={openDrawer} onClose={close} title="MOVIE">
        <NavLink to={"/"}>
          <h1
            onClick={() => {
              dispatch(addFilterGenresId(null));
              close();
            }}
            className=" hover:bg-gray-200 active:bg-slate-500 text-lg tracking-wider border-b-2 p-2  font-semibold "
          >
            All new movies
          </h1>
        </NavLink>
        <h1
          onClick={() => setToggle(!toggle)}
          className=" p-2 flex justify-between items-center text-lg select-none tracking-wider font-semibold  border-b-2 hover:bg-gray-200 "
        >
          Genres
          <span className=" text-xl">
            {toggle ? <IoIosArrowDown /> : <IoIosArrowUp />}
          </span>
        </h1>
        <ul
          className={` cursor-pointer border-b-2 pb-2 ps-2 flex flex-col ${
            toggle && "hidden"
          } gap-1 my-2`}
        >
          {moviesGenres?.map((item) => (
            <li
              onClick={genresHandeller}
              className=" select-none hover:bg-slate-300 px-2  text-[14px] tracking-wider font-semibold cursor-pointer"
              key={item.id}
              id={item.id}
            >
              {item.name}
            </li>
          ))}
        </ul>

        <div className=" bg-black  p-3 rounded-lg mt-2 ">
          <Avatar color="dark" radius={"xl"} />
          <h1 className="text-white mt-1 text-sm font-bold tracking-wider">
            {user?.name}
          </h1>
          <h1 className="text-white mt-1 text-sm font-semibold tracking-wider">
            {user?.email}
          </h1>
        </div>
        <div
          onClick={logOutHandeller}
          className=" border flex justify-center border-black hover:scale-[1.02] transition text-black text-center py-1 font-bold mt-2 rounded-lg"
        >
          {isLoading ? <Loader color="black" size={"sm"} /> : "Log out"}
        </div>
      </Drawer>

      <Group position="center">
        <Button
          variant="outline"
          className=" text-black border border-black"
          onClick={() => {
            setuser(JSON.parse(Cookies.get("user")));
            open();
          }}
        >
          <GiHamburgerMenu className=" text-xl " />
        </Button>
      </Group>
    </div>
  );
};

export default CatagoriesDrawer;
