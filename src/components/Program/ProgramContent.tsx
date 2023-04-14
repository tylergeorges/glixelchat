import { ReactNode } from "react";

export const ProgramContent = ({
  children,
  program_id,
}: {
  children: ReactNode;
  program_id?: number;
}) => {
  return (
    <div  id={`program-content-dark`} className="box-border flex h-full w-full overflow-auto ">
      {children}
    </div>
  );
};
