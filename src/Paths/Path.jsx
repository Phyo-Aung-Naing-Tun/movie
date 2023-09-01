import React from "react";
import HomePage from "../Pages/HomePage";
import { Route, Routes } from "react-router-dom";
import NavBar from "../Components/NavBar";
import MovieDetail from "../Pages/MovieDetail";
import SearchPage from "../Pages/SearchPage";
import ShowGenres from "../Pages/ShowGenres";
import SignUp from "../Pages/SignUp";
import LogIn from "../Pages/LogIn";
import GuardPage from "../Pages/GuardPage";

const Path = () => {
  return (
    <>
      <NavBar />

      <Routes>
        <Route
          path="/"
          element={
            <GuardPage>
              <HomePage />
            </GuardPage>
          }
        />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/detail" element={<MovieDetail />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/genres" element={<ShowGenres />} />
      </Routes>
      {/* <Footer /> */}
    </>
  );
};

export default Path;
