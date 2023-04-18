import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { authOptions } from "../api/auth/[...nextauth]";
import { getServerSession } from "next-auth/next";
import { User } from "@prisma/client";
import { Desktop, TaskBar } from "@ui";
import { setCurrentUser, setPosts } from "@mainslice";
import { useAppDispatch } from "@hooks";
import { glixelApi } from "@util";

export default function DesktopPage({
  posts,
  user,
}: Glixel.Props.DesktopProps) {
  const router = useRouter();
  const { status } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    if (status === "authenticated") {
      dispatch(setPosts(posts));
      dispatch(setCurrentUser(user));
    }
  }, [status, dispatch, posts, router, user]);

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
  if (!session || !session.user)
    return { props: { message: "No current session for user." } };

  const user = (await glixelApi("/users").get({
    queryParams: `?email=${session.user.email}`,
  })) as User;

  const posts = await glixelApi("/users/:user_id/feed").get({
    user_id: user.id,
  });

  return {
    props: { posts: posts, user: user },
  };
}
