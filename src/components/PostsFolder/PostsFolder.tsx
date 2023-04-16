import { useEffect, useState } from "react";
import { Program } from "../Program/Program";
import { ProgramChildrenProps } from "../Program/program.types";
import { User } from "../../types";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  addToPosts,
  selectPosts,
  selectUser,
  setCurrentProfile,
} from "../../redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PostResponse } from "../../../pages/api/posts";
import { InputWrapper } from "../InputWrapper";

export type Post = {
  authorId: User;
  // author: User;
  content: string;
  createdAt: string;
  id: number;
};

export type Reply = {
  author: User;
  content: string;
  created_at: string;
  post_id: number;
  id: number;
};

export function PostsFolder({ zIndex, program_id }: ProgramChildrenProps) {
  const posts = useAppSelector(selectPosts);
  const [currentPost, setCurrentPost] = useState<PostResponse>();

  const router = useRouter();
  const post_id = Number(router.query.post_id);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  useEffect(() => {}, [post_id]);

  async function createPost(post_content: string) {
    try {
      const res = await fetch("http://localhost:3000/api/posts", {
        method: "POST",
        body: JSON.stringify({
          authorId: user.id,
          content: post_content,
        }),
      });

      if (!res.ok) {
        throw new Error("Creating post returned 404.");
      }

      const new_post = (await res.json()) as PostResponse;

      dispatch(addToPosts(new_post));
    } catch (err) {
      if (err instanceof Error) {
        console.error("ERROR CREATING POST: ", err.message);
      }
    }
  }

  function handleProfileClick(username: string) {
    dispatch(setCurrentProfile(username));
  }
  return (
    <Program
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
                <Link
                  href={`/desktop?program=posts&post_id=${post.id}`}
                  shallow={true}
                  key={post.id}
                  className="clickable posts-con  my-5 flex h-1/3  flex-col      bg-lighter p-2 text-left text-white"
                  onClick={() => setCurrentPost(post)}
                >
                  <Link
                    href={`/desktop?program=user_profile&user=${post.author.username}`}
                    className="clickable"
                    shallow={true}
                    onClick={() => handleProfileClick(post.author.username)}
                  >
                    <h3 className="username text-2xl">
                      {post.author.username}
                    </h3>
                  </Link>
                  <div className="h-full     ">
                    <span className="text-xl line-clamp-4">{post.content}</span>
                  </div>
                  <div className="w-full  text-left">
                    <span className="h-10 ">{post.createdAt}</span>
                  </div>
                </Link>
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
                <span className="h-10 ">{currentPost.createdAt}</span>
              </div>
            </div>
          )}
        </div>
        <InputWrapper submit_callback={createPost} />
      </div>
    </Program>
  );
}
