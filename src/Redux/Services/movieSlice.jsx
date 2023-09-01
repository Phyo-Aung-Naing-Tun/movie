import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  moviesGenres: [],
  filterGenresId: null,
  reviews: [],
  searchTearms: "",
};

export const movieSlice = createSlice({
  name: "movieSlice",
  initialState,
  reducers: {
    getMovies: (state, { payload }) => {
      state.movies = payload;
    },
    getMoviesGenres: (state, { payload }) => {
      state.moviesGenres = payload;
    },
    addFilterGenresId: (state, { payload }) => {
      state.filterGenresId = payload;
    },
    addReviews: (state, { payload }) => {
      state.reviews = payload;
    },
    addSearchTearms: (state, { payload }) => {
      state.searchTearms = payload;
    },
  },
});

export const {
  addSearchTearms,
  addReviews,
  addFilterGenresId,
  getMoviesGenres,
  getMovies,
} = movieSlice.actions;
export default movieSlice.reducer;
