import { useEffect, useState } from "react";
import { Program } from "../Program/Program";
import { ProgramChildrenProps } from "../Program/program.types";
import { User } from "../../types";
import { test_user } from "../MessagesFolder/MessagesFolder";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { addToPosts } from "../../redux/slices/mainSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { PostResponse } from "../../../pages/api/posts";

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

// const date = new Date();
// const post_data = [
//   {
//     author: test_user,
//     content: "My first glixxel post!",
//     createdAt: date,
//     id: "300",
//     authorId: test_user.id,
//   },
//   {
//     author: test_user,
//     content: "My second glixxel post! Im starting to get the hang of this.",
//     createdAt: date,
//     id: "301",
//     authorId: test_user.id,
//   },
//   {
//     author: test_user,
//     content:
//       "My third glixxel post! Im starting to get the hang of this. even longer message this time to test out the formatting, today i just coded, then after that I coded some more, then I started working on this lorem ipsum template for long posts apparently this still isnt long enough so im going to add even more",
//     createdAt: date,
//     id: "302",
//     authorId: test_user.id,
//   },
//   {
//     author: test_user,
//     content:
//       "My fourth glixxel post! Im starting to get the hang of this. even longer message this time to test out the formatting, today i just coded, then after that I coded some more, then I started working on this lorem ipsum template for long posts apparently this still isnt long enough so im going to add even more",
//     createdAt: date,
//     id: "303",
//     authorId: test_user.id,
//   },
// ] as PostResponse[];
export function PostsFolder({ zIndex, program_id }: ProgramChildrenProps) {
  // const [posts, setPosts] = useState<PostResponse[]>();
  const posts = useAppSelector((state) => state.mainSlice.posts);
  const [currentPost, setCurrentPost] = useState<PostResponse>();
  const [newPostContent, setNewPostContent] = useState("");
  const { data: session, status } = useSession();

  const router = useRouter();
  const post_id = Number(router.query.post_id);
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.mainSlice.user);

  useEffect(() => {
    // const static_post = post_data.find((post) => post.id == post_id);
    console.log(user);
    // setCurrentPost(static_post);
  }, [post_id, user]);

  async function createPost(e: React.FormEvent) {
    e.preventDefault();
    if (user) {
      try {
        // const post_body = { authorId: user.id, content: newPostContent };
        const res = await fetch("http://localhost:3000/api/posts", {
          method: "POST",
          body: JSON.stringify({ authorId: user.id, content: newPostContent }),
        });

        if (!res.ok) {
          throw new Error("Creating post returned 404.");
        }

        const new_post = (await res.json()) as PostResponse;

        console.log("new post: ", new_post);
        dispatch(addToPosts(new_post));
        // setPosts((prev) => [...prev, new_post]);
      } catch (err) {
        if (err instanceof Error) {
          console.error("ERROR CREATING POST: ", err.message);
        }
      }
    }
  }

  function handlePostInput(e: React.SyntheticEvent) {
    e.preventDefault();

    setNewPostContent(e.target?.value);
  }
  return (
    <Program
      bar_color="dark"
      program_name="posts"
      zIndex={zIndex}
      program_id={program_id}
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
                    <span className="h-10 ">{post.createdAt.toLocaleDateString()}</span>
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
                <span className="h-10 ">
                  {currentPost.createdAt.toLocaleDateString()}
                </span>
              </div>
            </div>
          )}
        </div>
        <form
          onSubmit={createPost}
          className="flex h-1/6 w-full items-center justify-center bg-dark p-4"
        >
          <input
            placeholder={!post_id ? "Make a post..." : "Reply..."}
            className="input h-14 w-full bg-lighter p-2 "
            onChange={handlePostInput}
          />

          <button type="submit" />
        </form>
      </div>
    </Program>
  );
}
