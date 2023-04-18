import { User } from "@prisma/client";
import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";

interface InitialState {
  user: User | undefined;
  posts: Glixel.Post[];
  current_profile: {
    user: User | undefined;
    posts: Glixel.Post[];
  };
}
const initialState = {
  user: undefined,
  posts: [],
  current_profile: {
    posts: [],
    user: undefined,
  },
} as InitialState;

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      console.log("SETCURRENTUSER ACTOIN: ", action.payload);
      state.user = action.payload;
    },
    setPosts: (state, action: PayloadAction<Glixel.Post[]>) => {
      console.log(action.payload);
      state.posts = action.payload;
    },
    addToPosts: (state, action: PayloadAction<Glixel.Post>) => {
      return { ...state, posts: [action.payload, ...state.posts] };
    },
    setCurrentProfile: (
      state,
      action: PayloadAction<{ user: User; posts: Glixel.Post[] }>
    ) => {
      state.current_profile = action.payload;
    },
  },
});

type State = { mainSlice: InitialState };
export const selectPosts = createSelector(
  (state: State) => state.mainSlice,
  (mainSlice) => mainSlice.posts
);

export const selectCurrentProfile = (state: State) =>
  state.mainSlice.current_profile;
export const selectUser = (state: State) => state.mainSlice.user;
export const { setCurrentUser, addToPosts, setPosts, setCurrentProfile } =
  mainSlice.actions;
export default mainSlice.reducer;
