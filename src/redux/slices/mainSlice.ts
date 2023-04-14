import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { PostResponse } from "../../../pages/api/posts/index";

interface InitialState {
  user: User | undefined;
  posts: PostResponse[];
}
const initialState = {
  user: undefined,
  posts: [],
} as InitialState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      //   return { ...state, user: action.payload };
    },
    setPosts: (state, action: PayloadAction<PostResponse[]>) => {
      console.log(action.payload);
      state.posts = action.payload;
    },
    addToPosts: (state, action: PayloadAction<PostResponse>) => {
      state.posts.concat(action.payload);
    },
  },
});

export const { setCurrentUser, addToPosts, setPosts } = mainSlice.actions;
export default mainSlice.reducer;
