import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@hooks";
import { selectUser, setCurrentProfile } from "@mainslice";
import { useCallback } from "react";
import { glixelApi } from "@util";
//! old height  h-20
export function TaskBar() {
  const router = useRouter();
  function handleSignOut() {
    signOut();

    router.push("/");
  }
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const handleProfileIconClick = useCallback(
    async function (e: React.SyntheticEvent) {
      e.preventDefault();
      const get_users_posts = (await glixelApi("/users/:user_id/posts").get({
        user_id: user.id,
      })) as Glixel.Post[];

      dispatch(setCurrentProfile({ posts: get_users_posts, user: user }));
    },
    [user, dispatch]
  );
  return (
    <div
      id="taskbar"
      className="flex h-20 w-full flex-row items-center justify-start border-b-4 border-dark bg-pink px-6"
    >
      {/* <Editor cell_size={10} element_id="taskbar" /> */}

      <button
        onClick={handleProfileIconClick}
        className="clickable   mr-6 text-2xl text-dark"
      >
        Profile
        {/* <ProfileIcon className={"w-10 clickable"} /> */}
      </button>

      {/* <button className="clickable w-20">Profile</button> */}

      <button
        className="clickable text-2xl   text-dark"
        onClick={handleSignOut}
      >
        Log out
      </button>
    </div>
  );
}
