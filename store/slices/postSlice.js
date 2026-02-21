import { createSlice } from "@reduxjs/toolkit";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    myPosts: [],
  },
  reducers: {
    setAllPosts: (state, action) => {
      state.allPosts = action.payload;
    },
    setMyPosts: (state, action) => {
      state.myPosts = action.payload;
    },
    clearPosts: (state) => {
      state.allPosts = [];
      state.myPosts = [];
    },
  },
});

export const { setAllPosts, setMyPosts, clearPosts } = postsSlice.actions;
export default postsSlice.reducer;
