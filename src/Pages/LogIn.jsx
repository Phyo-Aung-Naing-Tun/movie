import React, { useState } from "react";

import { Button, Group, Loader, PasswordInput, TextInput } from "@mantine/core";

import { useForm } from "@mantine/form";
import { Link, useNavigate } from "react-router-dom";
import { useGetLogInMutation } from "../Redux/Api/auth";
import { useDispatch } from "react-redux";
import { putUserData } from "../Redux/Services/authSlice";

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
        value.length <= 8 ? "Password must have at least 8 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <div
      style={{
        backgroundImage: `url(https://img.freepik.com/free-vector/movie-graphic-icons-light-blue-background-simple-i-love-movie-concept-graphic-design_1284-42058.jpg?w=740&t=st=1693419299~exp=1693419899~hmac=b3e7229e240f4084e90e9fc751fd39f32f6b2671b29700a09b3376616cfc825a)`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: " center center",
        backgroundSize: "cover",
      }}
      className=" fixed flex-col top-0 bottom-0 right-0 left-0  z-40 w-full h-screen flex justify-center items-center "
    >
      <div className=" fixed top-0 bottom-0 start-0 right-0 bg-[#00000035]"></div>
      <form
        className=" bg-white z-10 flex shadow-2xl flex-col gap-4 md:w-[350px] w-[93%] rounded-lg p-5 "
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
        <h1 className=" text-center text-2xl font-bold text-gray-500">
          Log in
        </h1>
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
        <h3 className="text-xs font-bold tracking-wider">
          Create an account?{" "}
          <Link to={"/signup"}>
            <span>Sign up</span>
          </Link>
        </h3>
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
    </div>
  );
};

export default LogIn;
