import { ProfileSvg } from "../svg/ProfileSvg";
import { ProfileIcon } from "./DesktopIcon/ProfileIcon";
import { Editor } from "./PixelEditor/Editor";

export const TaskBar = () => {
  return (
    <div
      id="taskbar"
      className="w-full bg-pink h-20 flex flex-row items-center justify-start px-6"
    >
      {/* <Editor cell_size={10} element_id="taskbar" /> */}

        <ProfileSvg size={6}/>
    </div>
  );
};
