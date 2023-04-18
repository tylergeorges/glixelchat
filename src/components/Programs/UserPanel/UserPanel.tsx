import { useAppSelector } from "@hooks";
import { selectCurrentProfile } from "@mainslice";
import { Post } from "@prisma/client";
import { Program } from "@ui";
import { useEffect } from "react";
import { FakePfp } from "src/svg/FakePfp";

// const dummyPosts: Glixel.Post[] = [
//   {
//     authorId: "qweq",
//     content: "test post",
//     createdAt: "today",
//     id: "erwerwewerwe",
//     author: {
//       createdAt: "wqeqw",
//       email: "wqeqw",
//       username: "test user",
//       id: "wwewq"
//     },
//   },
//   {
//     authorId: "qweq",
//     content: "2nd test post omg yeah dude",
//     createdAt: "today",
//     id: "rrrrew",
//     author: {
//       createdAt: "wqeqw",
//       email: "wqeqw",
//       username: "test user",
//       id: "wwewq"
//     },
//   },
//   {
//     authorId: "qweq",
//     content:
//       "third test  post of the day lolzzz long line here to test the line clamping feature",
//     createdAt: "today",
//     id: "rrffdssq",
//     author: {
//       createdAt: "wqeqw",
//       email: "wqeqw",
//       username: "test user",
//       id: "wwewq"
//     },
//   },
// ];
export const UserPanel = ({
  zIndex,
  program_id,
}: Glixel.Props.ProgramChildrenProps) => {
  const current_profile = useAppSelector(selectCurrentProfile);


  if(current_profile.user)
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
        <div className="flex h-2/5  w-full flex-col items-center justify-start bg-dark ">
          <FakePfp className={"w-2/3 "} />
          <span className="user-panel_username mb-2  text-2xl">
            {current_profile.user?.username}
          </span>
          <span className="mb-2 ">followers: 0 following: 0</span>
          <button
            className="clickable h-2/3 w-24 bg-pink p-1 text-center "
            id="follow-button"
          >
            Follow
          </button>
        </div>

        <div className="overflow-y-auto">
          {current_profile.posts.map((post) => {
            return (
              <div
                key={post.id}
                className="clickable posts-con  my-5 flex   flex-col      bg-lighter p-2 text-left text-white"
              >
                <div>
                  <h3 className="username text-2xl">{post.author.username}</h3>
                </div>
                <div className="h-full     ">
                  <span className="text-md line-clamp-2">{post.content}</span>
                </div>
                <div className="h-9 w-full  text-left">
                  <span className="h-10 ">{post.createdAt}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Program>
  );
};
