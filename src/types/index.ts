import { HTMLProps } from "react";

export declare interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant: "contained" | "outlined";
}

export type User = {
  username: string;
  createdAt: string;
  id: string;
};

export type Message = {
  sender: User;
  content: string;
  createdAt: string;
  id: number;
};

export type Conversation = {
  recent_message: Message;
  id: number;
};
