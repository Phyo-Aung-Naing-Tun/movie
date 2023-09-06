import React, { useState } from "react";

import { Button, Group, Loader, PasswordInput, TextInput } from "@mantine/core";

import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useGetLogInMutation } from "../Redux/Api/auth";
import { useDispatch } from "react-redux";
import { putUserData } from "../Redux/Services/authSlice";
import "../Style/auth.css";
import { motion } from "framer-motion";

const LogIn = () => {
  const [getLogIn, { isLoading }] = useGetLogInMutation();
  const [toggle, setToggle] = useState(true);

  const dispatch = useDispatch();
  const nav = useNavigate();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <motion.div
      style={{}}
      className=" bg-Gradient fixed flex-col top-0 bottom-0 right-0 left-0  z-40 w-full h-screen flex justify-center items-center "
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" fixed top-0 bottom-0 start-0 right-0 bg-[#00000035]"
      ></motion.div>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        className=" text-gray-600 uppercase italic text-center tracking-wider px-3 py-2 font-extrabold  mb-5 text-2xl"
      >
        Please log in before you enter.
      </motion.div>
      <form
        className=" bg-white z-10 flex shadow-2xl flex-col gap-4 md:w-[380px] width-control rounded-lg p-5 "
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await getLogIn(values);
            console.log(data);
            if (data?.success) {
              dispatch(putUserData(data));
              setToggle(true);
              nav("/");
            } else {
              setToggle(false);
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <motion.h1
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className=" text-center text-2xl font-bold text-gray-500"
        >
          Log in
        </motion.h1>
        <TextInput
          variant="filled"
          required
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          variant="filled"
          required
          placeholder="Password"
          {...form.getInputProps("password")}
        />{" "}
        <motion.h3
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs  tracking-wider"
        >
          Create an account?{" "}
          <Link to={"/signup"}>
            <span className=" font-bold cursor-pointer">Sign up</span>
          </Link>
        </motion.h3>
        <h3
          className={`text-xs ${
            toggle ? "hidden" : null
          } text-red-600 font-bold tracking-wider`}
        >
          Login fail
        </h3>
        <Group>
          <Button
            className=" w-full tracking-wider font-bold bg-black"
            type="submit"
          >
            {isLoading ? <Loader color="white" size="sm" /> : "Login"}
          </Button>
        </Group>
      </form>
    </motion.div>
  );
};

export default LogIn;
