import { useState } from "react";
import { Program } from "../Program";
import { ProgramChildrenProps } from "../Program/program.types";
import { EarthSvg } from "../../svg/EarthSvg";
import { Conversation,  } from "../../types";
import { User } from "@prisma/client";

export const test_user: User = {
  id: '200',
  username: "test user",
  createdAt: new Date()
};

export function MessagesFolder({ zIndex, program_id }: ProgramChildrenProps) {
  const [convos, setConvos] = useState<Conversation[]>([
    {
      id: 0,
      recent_message: {
        content: "Hey this is a test message",
        id: 100,
        created_at: Date.now().toLocaleString(),
        sender: test_user,
      },
    },
  ]);
  return (
    <Program
      bar_color="dark"
      program_name="messages"
      zIndex={zIndex}
      program_id={program_id}
    >
      <div className="flex h-full w-full      flex-col">
        <div
          id="server-content"
          className="mt-1 flex h-full w-full items-start  justify-start "
        >
          {convos.map((convo) => {
            return (
              <div
                className="overflow-hidden clickable conversation-preview_con flex h-28   w-1/2 flex-col break-words bg-lighter p-1 text-left text-white"
                key={convo.id}
              >
                <h3 className="username text-2xl">
                  {convo.recent_message.sender.username}
                </h3>
                <span className="text-xl line-clamp-1">{convo.recent_message.content}</span>
              </div>
            );
          })}
        </div>
      </div>
    </Program>
  );
}
