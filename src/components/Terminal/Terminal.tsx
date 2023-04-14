import { Program } from "../Program";
import { useHandleCaret } from "../../hooks/useHandleCaret";
import { useState, useCallback } from "react";
import { TerminalInput } from "./TerminalInput";
import { ProgramChildrenProps } from "../Program/program.types";




export const Terminal = ({ zIndex, program_id }: ProgramChildrenProps) => {
  return (
    <Program bar_color="dark" program_name="terminal" zIndex={zIndex} program_id={program_id}>
      <TerminalInput />
    </Program>
  );
};
