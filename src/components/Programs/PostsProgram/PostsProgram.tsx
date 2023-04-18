import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { addToPosts, selectPosts, selectUser } from "@mainslice";
import { CurrentPost, InputWrapper, Post, Program } from "@ui";
import { useAppDispatch, useAppSelector } from "@hooks";
import { glixelApi } from "@util";

export function PostsProgram({
  zIndex,
  program_id,
  setShowProgram,
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
      const res = await glixelApi("/posts").post({
        authorId: user.id as string,
        content: post_content,
      });

      const new_post = res as Glixel.Post;

      dispatch(addToPosts(new_post));
    }
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
          {/* Only render home posts if there isnt a current post being displayed. */}
          {!currentPost ? (
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
            <CurrentPost post={currentPost} />
          )}
        </div>
        <InputWrapper submit_callback={createPost} />
      </div>
    </Program>
  );
}
