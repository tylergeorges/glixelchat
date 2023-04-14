import { useEffect, useState } from "react";
import { Program } from "../Program/Program";
import { ProgramChildrenProps } from "../Program/program.types";
import { User } from "../../types";
import { test_user } from "../MessagesFolder/MessagesFolder";
import Link from "next/link";
import { useRouter } from "next/router";

export type Post = {
  author: User;
  content: string;
  created_at: string;
  id: number;
};

export type Reply = {
  author: User;
  content: string;
  created_at: string;
  post_id: number;
  id: number;
};

const date = new Date().toLocaleDateString();
const post_data = [
  {
    author: test_user,
    content: "My first glixxel post!",
    created_at: date,
    id: 300,
  },
  {
    author: test_user,
    content: "My second glixxel post! Im starting to get the hang of this.",
    created_at: date,
    id: 301,
  },
  {
    author: test_user,
    content:
      "My third glixxel post! Im starting to get the hang of this. even longer message this time to test out the formatting, today i just coded, then after that I coded some more, then I started working on this lorem ipsum template for long posts apparently this still isnt long enough so im going to add even more",
    created_at: date,
    id: 302,
  },
  {
    author: test_user,
    content:
      "My fourth glixxel post! Im starting to get the hang of this. even longer message this time to test out the formatting, today i just coded, then after that I coded some more, then I started working on this lorem ipsum template for long posts apparently this still isnt long enough so im going to add even more",
    created_at: date,
    id: 303,
  },
] as Post[];
export function PostsFolder(props) {
  const [posts, setPosts] = useState<Post[]>(post_data);
  const [currentPost, setCurrentPost] = useState<Post>();

  const router = useRouter();
  const post_id = Number(router.query.post_id);

  useEffect(() => {
    const static_post = post_data.find((post) => post.id == post_id);

    setCurrentPost(static_post);
  }, [post_id]);
  return (
    <Program
      bar_color="dark"
      program_name="posts"
      zIndex={props.zIndex}
      program_id={props.program_id}
    >
      <div className="flex h-full w-full flex-col">
        <div className="flex h-full w-full flex-col overflow-y-auto">
          {!post_id && !currentPost ? (
            posts.map((post) => {
              return (
                <Link
                  href={`/?program=posts&post_id=${post.id}`}
                  key={post.id}
                  className="clickable posts-con  my-5 flex h-1/3  flex-col      bg-lighter p-2 text-left text-white"
                  onClick={() => setCurrentPost(post)}
                >
                  <div>
                    <h3 className="username text-2xl">
                      {post.author.username}
                    </h3>
                  </div>
                  <div className="h-full     ">
                    <span className="text-xl line-clamp-4">{post.content}</span>
                  </div>
                  <div className="w-full  text-left">
                    <span className="h-10 ">{post.created_at}</span>
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
                <span className="h-10 ">{currentPost?.created_at}</span>
              </div>
            </div>
          )}
        </div>
        <div className="flex h-1/6 w-full items-center justify-center bg-dark p-4">
          <input
            placeholder={!post_id ? "Make a post..." : "Reply..."}
            className="input h-14 w-full bg-lighter p-2 "
          />
        </div>
      </div>
    </Program>
  );
}
