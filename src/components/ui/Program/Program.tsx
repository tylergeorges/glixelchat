import { ProgramContent } from "./ProgramContent";
import { useDragging, useDesktopContext } from "@hooks";
import { TitleBar } from "./TitleBar";
import { useCallback } from "react";
import { useRouter } from "next/router";

export const Program = ({
  children,
  program_name,
  bar_color,
  program_id,
  extra_params,
  setShowProgram,
  draggable,
  className,
}: Glixel.Props.ProgramProps) => {
  useDragging({
    element_id: `title-bar-program_id-${program_id}`,
    parent_id: `program-program_name-${program_id}`,
    program_id: program_id,
    program_name: program_name,
    extra_params: extra_params,
    disabled: !draggable || false,
  });
  const { changeActiveProgram, activeProgramId } = useDesktopContext();
  const router = useRouter();
  const handleProgramClick = useCallback(() => {
    if (activeProgramId !== program_id) {
      changeActiveProgram({ program_id });
    }
  }, [activeProgramId, changeActiveProgram, program_id]);

  const handleCloseClick = useCallback(
    function (e: Glixel.Events.ButtonEvent) {
      e.preventDefault();
      setShowProgram(false);
    },
    [setShowProgram]
  );
  return (
    <div
      draggable={false}
      id={`program-program_name-${program_id}`}
      className={
        className
          ? `${className} program-color-${bar_color} absolute self-center`
          : `${
              router.query.program == program_name
                ? "active-program"
                : "inactive-program"
            }  program program-color-${bar_color} absolute    box-border flex h-1/2 w-2/3 max-w-4xl flex-col items-center justify-center place-self-center self-center bg-${bar_color}  p-2 `
      }
      onClick={handleProgramClick}
    >
      <div
        className={`flex w-full flex-row items-center justify-center bg-${bar_color}`}
      >
        <TitleBar
          program_id={program_id}
          bar_color={bar_color}
          program_name={program_name}
        />

        {draggable && (
          <button
            className=" clickable  mx-2 ml-0  text-4xl  text-lighter-200"
            onClick={handleCloseClick}
          >
            x
          </button>
        )}
      </div>
      <ProgramContent>{children}</ProgramContent>
    </div>
  );
};
