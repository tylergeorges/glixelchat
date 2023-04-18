import { useState } from "react";
import { User } from "@prisma/client";
import { Program } from "@ui";

export const test_user: User = {
  id: "200",
  username: "test user",
  createdAt: new Date(),
  email: "teatrew",
};

export function MessagesProgram({
  zIndex,
  program_id,
  setShowProgram,
}: Glixel.Props.ProgramChildrenProps) {
  const [convos, setConvos] = useState<Glixel.Conversation[]>([
    {
      id: 0,
      recent_message: {
        content: "Hey this is a test message",
        id: 100,
        createdAt: Date.now().toLocaleString(),
        sender: test_user,
      },
    },
  ]);
  return (
    <Program
      setShowProgram={setShowProgram}
      bar_color="dark"
      program_name="messages"
      zIndex={zIndex}
      program_id={program_id}
      draggable={true}
    >
      <div className="flex h-full w-full      flex-col">
        <div
          id="server-content"
          className="mt-1 flex h-full w-full items-start  justify-start "
        >
          {convos.map((convo) => {
            return (
              <div
                className="clickable conversation-preview_con flex h-28 w-1/2   flex-col overflow-hidden break-words bg-lighter p-1 text-left text-white"
                key={convo.id}
              >
                <h3 className="username text-2xl">
                  {convo.recent_message.sender.username}
                </h3>
                <span className="text-xl line-clamp-1">
                  {convo.recent_message.content}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </Program>
  );
}
