import { ReactNode } from "react";

export interface ProgramProps {
  children: ReactNode;
  bar_color: "dark" | "pink";
  program_name: string;
  program_id: number;
  zIndex: number;
}

export interface ProgramChildrenProps {
  zIndex: number;
  program_id: number;
}
