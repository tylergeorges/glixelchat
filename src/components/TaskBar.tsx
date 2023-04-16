import { signOut } from "next-auth/react";
import { ProfileSvg } from "../svg/ProfileSvg";
import { Editor } from "./PixelEditor/Editor";
import { useRouter } from "next/router";

export const TaskBar = () => {
  const router = useRouter();
  function handleSignOut() {
    signOut();

    router.push("/");
  }
  return (
    <div
      id="taskbar"
      className="flex h-16 w-full flex-row items-center justify-start bg-pink px-6"
    >
      {/* <Editor cell_size={10} element_id="taskbar" /> */}

      {/* <ProfileSvg size={6} />
       */}

      <button className="clickable w-20">Profile</button>

      <button className="clickable w-24" onClick={handleSignOut}>
        Log out
      </button>
    </div>
  );
};
