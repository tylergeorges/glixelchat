import { Program } from "@ui";
import { TerminalInput } from "./TerminalInput";

export function TerminalProgram({
  zIndex,
  program_id,
  setShowProgram
}: Glixel.Props.ProgramChildrenProps) {
  return (
    <Program
      bar_color="dark"
      program_name="terminal"
      zIndex={zIndex}
      program_id={program_id}
      setShowProgram={setShowProgram}
    >
      <TerminalInput />
    </Program>
  );
}
