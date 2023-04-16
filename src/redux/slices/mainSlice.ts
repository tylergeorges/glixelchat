import { User } from "@prisma/client";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { PostResponse } from "../../../pages/api/posts/index";

interface InitialState {
  user: User | undefined;
  posts: PostResponse[];
  current_profile: string;
}
const initialState = {
  user: undefined,
  posts: [],
  current_profile: "",
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
      return { ...state, posts: [action.payload, ...state.posts] };
    },
    setCurrentProfile: (state, action: PayloadAction<string>) => {
      state.current_profile = action.payload;
    },
  },
});

type State = { mainSlice: InitialState };
export const selectPosts = createSelector(
  (state: State) => state.mainSlice,
  (mainSlice) => mainSlice.posts
);

export const selectCurrentProfile = (state:State) => state.mainSlice.current_profile
export const selectUser = (state: State) => state.mainSlice.user;
export const { setCurrentUser, addToPosts, setPosts, setCurrentProfile } = mainSlice.actions;
export default mainSlice.reducer;
