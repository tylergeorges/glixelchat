import { User } from "@prisma/client";
import { FakePfp } from "src/svg/FakePfp";

/** User Info component, displays info such as the users following, followers and profile picture. */
export function UserInfo({ user }: { user: User }) {
  return (
    <div className="flex h-2/5  w-full flex-col items-center justify-start bg-dark ">
      <FakePfp className={"w-2/3 "} />
      <span className="user-panel_username mb-2  text-2xl">
        {user.username}
      </span>
      <span className="mb-2 ">followers: 0 following: 0</span>
      <button
        className="clickable h-2/3 w-24 bg-pink p-1 text-center "
        id="follow-button"
      >
        Follow
      </button>
    </div>
  );
}
