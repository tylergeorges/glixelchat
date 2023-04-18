import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { addToPosts, selectPosts, selectUser } from "@mainslice";
import { InputWrapper, Post, Program, UserName } from "@ui";
import { useAppDispatch, useAppSelector } from "@hooks";
import { glixelApi } from "@util";

export function PostsProgram({
  zIndex,
  program_id,
  setShowProgram
}: Glixel.Props.ProgramChildrenProps) {
  const posts = useAppSelector(selectPosts);
  const [currentPost, setCurrentPost] = useState<Glixel.Post>();

  const router = useRouter();
  const post_id = Number(router.query.post_id);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {}, [post_id]);

  async function createPost(post_content: string) {
    if (user) {
      console.log("AUTHOR ID: ", user);
      const res = await glixelApi("/posts").post({
        authorId: user.id as string,
        content: post_content,
      });

      const new_post = res as Glixel.Post;

      dispatch(addToPosts(new_post));
    }
    // try {

    //   // const res = await fetch("http://localhost:3000/api/posts", {
    //   //   method: "POST",
    //   //   body: JSON.stringify({
    //   //     authorId: user?.id,
    //   //     content: post_content,
    //   //   }),
    //   // });

    //   if (!res.ok) {
    //     throw new Error("Creating post returned 404.");
    //   }

    // } catch (err) {
    //   if (err instanceof Error) {
    //     console.error("ERROR CREATING POST: ", err.message);
    //   }
    // }
  }

  return (
    <Program
    setShowProgram={setShowProgram}
      bar_color="dark"
      program_name="posts"
      zIndex={zIndex}
      program_id={program_id}
      draggable={true}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          {!post_id && !currentPost ? (
            posts.map((post) => {
              return (
                <Post
                  key={post.id}
                  post={post}
                  setCurrentPost={setCurrentPost}
                />
              );
            })
          ) : (
            <div>
              <div>
                <h3 className="username text-2xl">
                  {currentPost?.author.username}
                </h3>
              </div>
              <div className="h-full     ">
                <span className="text-xl line-clamp-4">
                  {currentPost?.content}
                </span>
              </div>
              <div className="w-full  text-left">
                <span className="h-10 ">{currentPost?.createdAt}</span>
              </div>
            </div>
          )}
        </div>
        <InputWrapper submit_callback={createPost} />
      </div>
    </Program>
  );
}
