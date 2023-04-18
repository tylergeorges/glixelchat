import { HTMLProps } from "react";
import { User } from "@prisma/client";

declare global {
  namespace Glixel {
    interface Post {
      author: User;
      id: string;
      createdAt: string;
      content: string;
      authorId: string;
    }
    interface Message {
      sender: User;
      content: string;
      createdAt: string;
      id: number;
    }

    interface Reply {
      author: User;
      content: string;
      created_at: string;
      post_id: number;
      id: number;
    }
    interface Conversation {
      recent_message: Message;
      id: number;
    }

    /** For React element events */
    namespace Events {
      type ButtonEvent = MouseEvent<HTMLButtonElement>;
      type InputEvent = React.ChangeEvent<HTMLInputElement>;
      type FormSubmit = React.SyntheticEvent;
    }

    namespace Props {
      interface ProgramProps {
        children: ReactNode;
        bar_color: "dark" | "pink" | "light" | "lighter";
        program_name: string;
        program_id: number;
        zIndex: number;
        className?: string;
        /**Determins if the program is draggable or not.
         *
         * Defaults to true.
         */
        draggable?: boolean;

        extra_params?: string;
        setShowProgram?: Dispatch<SetStateAction<boolean>>;
      }

      interface ProgramChildrenProps {
        zIndex: number;
        program_id: number;
        staticPost?: Post;
        setShowProgram?: Dispatch<SetStateAction<boolean>>;
      }

      interface DesktopProps {
        posts: Glixel.Post[];
        user: User;
      }
    }
  }
}
