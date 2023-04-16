import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import { NavBar } from "../src/components/NavBar";
import { useEffect } from "react";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/desktop");
    }
  }, [status]);

  if (status === "unauthenticated") {
    return (
      <div className="flex h-screen w-full flex-col items-center justify-center bg-dark p-4">
        <NavBar />
        <div className="flex h-full w-full items-center justify-center text-center">
          <span className=" flex  flex-col items-center text-center text-[20rem] ">
            <span className="app-name_header_animated">glixel</span>
            {/* <div className="caret    text-center">e</div>l */}
            {/* <span className="caret text-[10rem]  ">_</span> */}

            <sub className="app_subheader mt-[-50px] text-xl text-yellow-400">
              [ a chat app. ]
            </sub>
          </span>
        </div>

        {/* <div className="landing-modal absolute right-10 bottom-10 flex h-36 w-1/3 flex-col bg-light p-4">
        <h1 className="landing-modal_header text-2xl">NEW MESSAGE!</h1>
        <span className="  mt-4 ">click here to open.</span>
      </div> */}
      </div>
    );
  }
  return <div>loading...</div>;
};

export default Home;
