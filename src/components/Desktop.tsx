import { useState } from "react";
import { Program } from "./Program";
import { Terminal } from "./Terminal";
import { Folder } from "./ServerFolder";
import { DesktopContext } from "../util/DesktopContext";
import { UserPanel } from "./UserPanel";
import { ServerFolder } from "./ServerFolder/ServerFolder";

type ProgramName = "terminal" | "folder";

interface Program {
  program_name: ProgramName;
}

interface HandleProgramArgs {
  program_name: ProgramName;
}

export const Desktop = () => {
  const [openedPrograms, setOpenedPrograms] = useState<Program[]>([
    {
      program_name: "terminal",
    },
    {
      program_name: "folder",
    },
  ]);

  const [activeProgramId, setActiveProgramId] = useState<number>(1);

  const handleOpenProgram = ({ program_name }: HandleProgramArgs) => {};

  const changeActiveProgram = ({ program_id }: { program_id: number }) => {
    setActiveProgramId(program_id);
    console.log(program_id, activeProgramId);
  };

  return (
    <div
      id="desktop"
      className="flex justify-center  w-full h-screen bg-light"
    >
      <UserPanel />
      <DesktopContext.Provider value={{ changeActiveProgram, activeProgramId }}>
        {openedPrograms.map((program, idx) => {
          return (
            <>
              {program.program_name === "terminal" && (
                <Terminal
                  program_id={idx}
                  zIndex={idx === activeProgramId ? 10 : 0}
                />
              )}
              {program.program_name === "folder" && (
                <ServerFolder
                  program_id={idx}
                  zIndex={idx === activeProgramId ? 10 : 0}
                />
              )}
            </>
          );
        })}

       
      </DesktopContext.Provider>
    </div>
  );
};
