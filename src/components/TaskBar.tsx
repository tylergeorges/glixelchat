import { ProfileSvg } from "../svg/ProfileSvg";
import { Editor } from "./PixelEditor/Editor";

export const TaskBar = () => {
  return (
    <div
      id="taskbar"
      className="flex h-20 w-full flex-row items-center justify-start bg-pink px-6"
    >
      {/* <Editor cell_size={10} element_id="taskbar" /> */}

      <ProfileSvg size={6} />
    </div>
  );
};
