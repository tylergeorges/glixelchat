import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { MessagesProgram, PostsProgram, UserPanel } from "@programs";
import { useAppSelector } from "@hooks";
import { selectCurrentProfile } from "@mainslice";
import { DesktopContext } from "@util";
import { DesktopIcons } from "src/components/ui/Desktop/DesktopIcons";

export const Desktop = () => {
  const router = useRouter();

  const [activeProgramId, setActiveProgramId] = useState<number>(2);
  const [showMessages, setShowMessages] = useState(true);
  const [showPosts, setShowPosts] = useState(true);
  const current_profile = useAppSelector(selectCurrentProfile);

  const show_profile = useMemo(
    () => current_profile.user,
    [current_profile.user]
  );
  function changeActiveProgram({ program_id }: { program_id: number }) {
    setActiveProgramId(program_id);
  }

  const openPostsClick = useCallback(
    function () {
      if (showPosts === false) {
        setShowPosts(true);
      }
    },
    [showPosts]
  );

  const openMessagesClick = useCallback(
    function () {
      if (showMessages === false) {
        setShowMessages(true);
      }
    },
    [showMessages]
  );

  return (
    <div
      id="desktop"
      className="flex h-screen w-full items-start justify-center bg-lighter"
    >
      <DesktopIcons
        openMessagesClick={openMessagesClick}
        openPostsClick={openPostsClick}
      />
      <DesktopContext.Provider value={{ changeActiveProgram, activeProgramId }}>
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
