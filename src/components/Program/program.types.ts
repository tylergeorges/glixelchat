import { ReactNode } from "react";
import { Post } from "../PostsFolder/PostsFolder";

export interface ProgramProps {
  children: ReactNode;
  bar_color: "dark" | "pink" | "light" | "lighter";
  program_name: string;
  program_id: number;
  zIndex: number;
}

export interface ProgramChildrenProps {
  zIndex: number;
  program_id: number;
  staticPost?: Post
}
