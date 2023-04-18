import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { NavBar } from "../src/components/ui/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/desktop");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-dark p-4">
        <NavBar />
        <div className="flex h-full w-full items-center justify-center text-center">
          <span className=" flex  flex-col items-center text-center text-[20rem] ">
            <span className="app-name_header_animated">glixel</span>

            <sub className="app_subheader mt-[-50px] text-xl text-yellow-400">
              [ a chat app. ]
            </sub>
          </span>
        </div>

      
      </div>
    );
  }
  return <div>loading...</div>;
};

export default Home;
