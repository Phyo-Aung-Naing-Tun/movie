import { Button, Group, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { useGetSignUpMutation } from "../Redux/Api/auth";
import { Link, useNavigate } from "react-router-dom";
import "../Style/auth.css";
import { easeInOut, motion } from "framer-motion";

const SignUp = () => {
  const [getSignUp, { isLoading }] = useGetSignUpMutation();
  const [errorMess, setError] = useState("");
  const nav = useNavigate();
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },

    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 letters" : null,
      password: (value) =>
        value.length < 8 ? "Password must have at least 8 letters" : null,
      password_confirmation: (value) =>
        value.length < 8 ? "Password must have at least 2 letters" : null,

      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  return (
    <motion.div className=" fixed flex-col bg-Gradient top-0 bottom-0 right-0 left-0 z-40 w-full h-screen flex justify-center items-center bg-gray-400">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className=" fixed top-0 bottom-0 start-0 right-0 bg-[#00000035]"
      ></motion.div>
      <form
        className="  bg-white z-10 flex shadow-2xl flex-col gap-4 w-[350px] width-control rounded-lg p-5 "
        onSubmit={form.onSubmit(async (values) => {
          try {
            const data = await getSignUp(values);
            console.log(data);
            console.log(values);

            if (data?.data.success) {
              nav("/login");
            } else if (data?.error) {
              setError(data?.error.data.message);
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
          Sign in
        </motion.h1>
        <TextInput
          variant="filled"
          required
          placeholder="Your Name"
          {...form.getInputProps("name")}
        />
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
        <PasswordInput
          variant="filled"
          required
          placeholder="Confirm password"
          {...form.getInputProps("password_confirmation")}
        />
        <motion.h3
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xs font-bold tracking-wider"
        >
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>LogIn</span>
          </Link>
        </motion.h3>
        <h3 className="text-xs font-bold text-red-500 tracking-wider">
          {errorMess}
        </h3>
        <Group>
          <Button
            className=" w-full tracking-wider font-bold bg-black"
            type="submit"
          >
            {isLoading ? <Loader color="cyan" size="sm" /> : "Sign up"}
          </Button>
        </Group>
      </form>
    </motion.div>
  );
};

export default SignUp;
