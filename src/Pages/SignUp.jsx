import { Button, Group, Loader, PasswordInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { useGetSignUpMutation } from "../Redux/Api/auth";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const [getSignUp, { isLoading }] = useGetSignUpMutation();
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
        value.length <= 8 ? "Password must have at least 8 letters" : null,
      password_confirmation: (value) =>
        value.length <= 8 ? "Password must have at least 2 letters" : null,

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
      className=" fixed flex-col top-0 bottom-0 right-0 left-0 z-40 w-full h-screen flex justify-center items-center bg-gray-400"
    >
      <div className=" fixed top-0 bottom-0 start-0 right-0 bg-[#00000035]"></div>
      <form
        className=" z-[9999] flex shadow-2xl flex-col gap-4 w-[93%]  md:w-[350px] bg-white rounded-lg p-5 "
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await getSignUp(values);
            console.log(data);

            if (data?.success) {
              nav("/login");
            }
          } catch (error) {
            console.log(error);
          }
        })}
      >
        <h1 className=" text-center text-2xl font-bold text-gray-500">
          Sign in
        </h1>
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
        <h3 className="text-xs font-bold tracking-wider">
          Already have an account?{" "}
          <Link to={"/login"}>
            <span>LogIn</span>
          </Link>
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
    </div>
  );
};

export default SignUp;
