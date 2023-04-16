import { HTMLAttributes, ReactNode, StyleHTMLAttributes } from "react";
import { Post } from "../PostsFolder/PostsFolder";

export interface ProgramProps {
  children: ReactNode;
  bar_color: "dark" | "pink" | "light" | "lighter";
  program_name: string;
  program_id: number;
  zIndex: number;
  className?: string
  /**Determins if the program is draggable or not.
   *
   * Defaults to true.
   */
  draggable?: boolean;
  
  extra_params?: string
}

export interface ProgramChildrenProps {
  zIndex: number;
  program_id: number;
  staticPost?: Post;
}
