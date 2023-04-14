import { HTMLProps } from "react";

export declare interface ButtonProps extends HTMLProps<HTMLButtonElement> {
  variant: "contained" | "outlined";
}

export type User = {
  username: string;
  profile_picture: string;
  id: number;
};

export type Message = {
  sender: User;
  content: string;
  created_at: string;
  id: number;
};

export type Conversation = {
  recent_message: Message;
  id: number;
};
