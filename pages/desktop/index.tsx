import { getSession, useSession } from "next-auth/react";
import { Desktop } from "../../src/components/Desktop";
import { TaskBar } from "../../src/components/TaskBar";
import Router, { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { Post } from "../../src/components/PostsFolder/PostsFolder";
import { useDispatch } from "react-redux";
import Nextauth, { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { User } from "@prisma/client";
import { setCurrentUser, setPosts } from "../../src/redux/slices/mainSlice";
import { PostResponse } from "../api/posts";
import { useAppDispatch } from "../../src/redux/store";

type DesktopProps = {
  posts: PostResponse[];
  user: User;
};

export default function DesktopPage({ posts, user }: DesktopProps) {
  const router = useRouter();
  const { data: session, status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    dispatch(setPosts(posts));
    dispatch(setCurrentUser(user));
  }, [router, status, dispatch, posts, user]);

  if (status === "authenticated") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center ">
        <TaskBar />
        <Desktop />
      </div>
    );
  }
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  if (!session || !session.user) return;

  const posts_res = await fetch("http://localhost:3000/api/posts");
  const posts = (await posts_res.json()) as Post[];

  const user_res = await fetch(
    `http://localhost:3000/api/users?username=${session.user.name}`
  );
  const user = (await user_res.json()) as User;

  console.log(user);

  // const user = ctx.

  // try {
  //   const posts_res = await fetch("/api/posts");
  //   posts = (await posts_res.json()) as Post[];

  //   if (!posts_res.ok) {
  //     throw new Error("Posts request resulted in 404.");
  //   }
  // } catch (err) {
  //   if (err instanceof Error) {
  //     console.error(
  //       "[ERROR] error fetching posts in getServerSideProps in Desktop page: ",
  //       err.message
  //     );
  //   }
  // }

  return {
    props: { posts: posts, user: user },
  };
}
