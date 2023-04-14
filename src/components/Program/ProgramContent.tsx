import { ReactNode } from "react";

export const ProgramContent = ({
  children,
  program_id,
}: {
  children: ReactNode;
  program_id?: number;
}) => {
  return (
    <div
      id={`program-content-dark`}
      className="flex box-border w-full h-full bg-dark"
    >
      {children}
    </div>
  );
};
