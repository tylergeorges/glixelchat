import { FakePfp } from "../../svg/FakePfp";

export const UserPanel = () => {
  return (
    <div
      id="user-panel"
      className="flex flex-col items-center  justify-start h-2/5 w-[40%] self-center  bg-light"
    >
      <div className="w-full h-10 ">profile</div>

      <div id="user-panel_box" className="w-[85%] h-[70%] bg-light_dark mt-1">
        <FakePfp />
      </div>
      <div className="flex w-full h-[20%] items-center justify-center">
        <span className="user-panel_username text-2xl self-center">
          kneadle
        </span>
      </div>
    </div>
  );
};
