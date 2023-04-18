import { useAppSelector } from "@hooks";
import { selectCurrentProfile } from "@mainslice";
import { Program } from "@ui";
import { UserInfo } from "src/components/Programs/UserPanel/UserInfo";
import { UserPosts } from "src/components/Programs/UserPanel/UserPosts";

export const UserPanel = ({
  zIndex,
  program_id,
}: Glixel.Props.ProgramChildrenProps) => {
  const current_profile = useAppSelector(selectCurrentProfile);

  if (current_profile.user) {
    return (
      <Program
        bar_color="pink"
        program_name="user_profile"
        extra_params={`&user=${current_profile}`}
        zIndex={zIndex}
        program_id={program_id}
        draggable={true}
        className={
          "box-border flex h-1/3 w-1/2 max-w-lg flex-col border-2 bg-dark"
        }
      >
        <div className="flex h-full w-full flex-col items-center justify-center p-3 ">
          <UserInfo user={current_profile.user} />

          <UserPosts posts={current_profile.posts} />
        </div>
      </Program>
    );
  }

  return null;
};
