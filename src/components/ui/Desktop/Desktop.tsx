import { useMemo, useState } from "react";
import { useRouter } from "next/router";
import {
  MessagesProgram,
  PostsProgram,
  TerminalProgram,
  UserPanel,
} from "@programs";
import { useAppSelector } from "@hooks";
import { selectCurrentProfile } from "@mainslice";
import { DesktopContext } from "@util";
import { MessagesIcon, PostsIcon } from "@icons";

export const Desktop = () => {
  const router = useRouter();

  const [activeProgramId, setActiveProgramId] = useState<number>(2);
  const [showMessages, setShowMessages] = useState(true);
  const [showPosts, setShowPosts] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const current_profile = useAppSelector(selectCurrentProfile);

  const show_profile = useMemo(
    () => current_profile.user,
    [current_profile.user]
  );
  function changeActiveProgram({ program_id }: { program_id: number }) {
    setActiveProgramId(program_id);
  }

  function openPostsClick() {
    if (showPosts === false) {
      setShowPosts(true);
    }
  }
  function openMessagesClick() {
    if (showMessages === false) {
      setShowMessages(true);
    }
  }

  return (
    <div
      id="desktop"
      className="flex h-screen  w-full  items-start justify-center bg-lighter"
    >
      <div className="flex h-full w-full items-start justify-start p-4 ">
        <div className="flex h-1/6 items-center justify-center">
          <div
            className="text-[16px] h-1/2 self-baseline flex flex-col items-center justify-center p-2 hover:bg-[rgba(255,255,255,0.2)]"
            onClick={openPostsClick}
          >
            <PostsIcon className="w-20" />
            Posts
          </div>
          <div
            className="text-[16px] text-end h-1/2  flex flex-col items-center justify-center p-2  self-baseline  hover:bg-[rgba(255,255,255,0.2)]"
            onClick={openMessagesClick}
          >
            <MessagesIcon className="w-16 " />
            Messages
          </div>
        </div>
      </div>
      <DesktopContext.Provider value={{ changeActiveProgram, activeProgramId }}>
        {showTerminal && (
          <TerminalProgram
            program_id={0}
            setShowProgram={setShowTerminal}
            zIndex={router.query.program == "terminal" ? 10 : 0}
          />
        )}
        {showMessages && (
          <MessagesProgram
            program_id={1}
            setShowProgram={setShowMessages}
            zIndex={router.query.program == "messages" ? 10 : 0}
          />
        )}
        {showPosts && (
          <PostsProgram
            program_id={2}
            setShowProgram={setShowPosts}
            zIndex={router.query.program === "posts" ? 10 : 0}
          />
        )}

        {show_profile && (
          <UserPanel
            zIndex={router.query.program == "user_profile" ? 10 : 0}
            program_id={3}
          />
        )}
      </DesktopContext.Provider>
    </div>
  );
};
