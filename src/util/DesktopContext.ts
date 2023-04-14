import { createContext, useContext } from "react";

interface DesktopContext {
  changeActiveProgram: ({ program_id }: { program_id: number }) => void;
  activeProgramId: number;
}

export const DesktopContext = createContext<DesktopContext>({
  changeActiveProgram: () => {},
  activeProgramId: 0,
});

export const useDesktopContext = () => useContext(DesktopContext);
