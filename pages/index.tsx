import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Editor } from "../src/components/PixelEditor/Editor";
import { TaskBar } from "../src/components/TaskBar";
import { Desktop } from "../src/components/Desktop";

const Home: NextPage = () => {
  return (
    <div className="flex-col items-center justify-center flex w-full h-screen ">
      <TaskBar />
      <Desktop />
    </div>
  );
};

export default Home;
