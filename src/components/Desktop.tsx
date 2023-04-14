import { useState } from "react";
import { Program } from "./Program";
import { Terminal } from "./Terminal";
import { DesktopContext } from "../util/DesktopContext";
import { UserPanel } from "./UserPanel";
import { MessagesFolder } from "./MessagesFolder";
import { PostsFolder } from "./PostsFolder";
import Link from "next/link";
import { useRouter } from "next/router";

type ProgramName = "terminal" | "messages" | "posts" | "profile";

interface Program {
  program_name: ProgramName;
}

interface HandleProgramArgs {
  program_name: ProgramName;
}

export const Desktop = () => {
  const router = useRouter();

  const [openedPrograms, setOpenedPrograms] = useState<Program[]>([
    {
      program_name: "terminal",
    },
    {
      program_name: "messages",
    },
    {
      program_name: "posts",
    },
  ]);

  const [activeProgramId, setActiveProgramId] = useState<number>(2);

  const handleOpenProgram = ({ program_name }: HandleProgramArgs) => {};

  const changeActiveProgram = ({ program_id }: { program_id: number }) => {
    setActiveProgramId(program_id);
  };

  return (
    <div
      id="desktop"
      className="flex h-screen  w-full justify-center bg-lighter"
    >
      <UserPanel />
      <DesktopContext.Provider value={{ changeActiveProgram, activeProgramId }}>
        {/* {openedPrograms.map((program, idx) => {
          return (
            <>
              {program.program_name === "terminal" && (
                <Terminal
                  program_id={idx}
                  zIndex={router.query.program == program.program_name ? 10 : 0}
                />
              )}
              {program.program_name === "messages" && (
                <MessagesFolder
                  program_id={idx}
                  zIndex={router.query.program == program.program_name ? 10 : 0}
                />
              )}
              {program.program_name == "posts" && (
                <PostsFolder
                  program_id={idx}
                  zIndex={
                    router.query.program === program.program_name ? 10 : 0
                  }
                />
              )}
            </>
          );
        })} */}

        <Terminal
          program_id={0}
          zIndex={router.query.program == "terminal" ? 10 : 0}
        />
        <MessagesFolder
          program_id={1}
          zIndex={router.query.program == "messages" ? 10 : 0}
        />
        <PostsFolder
          program_id={2}
          zIndex={router.query.program === "posts" ? 10 : 0}
        />
      </DesktopContext.Provider>
    </div>
  );
};
