import { useCallback, useEffect, useRef, useState } from "react";
import { useDesktopContext } from "../util/DesktopContext";
import { useRouter } from "next/router";

interface InitCoords {
  /**The mouse x-coord on the initial click. */
  x: number;

  /**The mouse y-coord on the initial click. */
  y: number;
}
interface ParentCoords {
  /**The parent elements current x-coord. */
  x: number;

  /**The parent elements current y-coord. */
  y: number;
}

export const useDragging = ({
  element_id,
  parent_id,
  program_id,
  program_name,
  disabled,
  extra_params,
}: {
  element_id: string;
  program_id: number;
  parent_id?: string;
  program_name?: string;
  disabled?: boolean;
  extra_params?: string;
}) => {
  const [isMouseDown, setisMouseDown] = useState(false);
  const router = useRouter();
  const { changeActiveProgram, activeProgramId } = useDesktopContext();
  // const isMouseDown = useRef(false);
  const parent_elementRef = useRef<HTMLElement>();
  const taskbar_elementRef = useRef<HTMLElement>();
  /**The  */
  const [initCoords, setInitCoords] = useState<InitCoords>({ x: 0, y: 0 });
  const [parentCoords, setParentCoords] = useState<ParentCoords>({
    x: 0,
    y: 0,
  });

  const drag = useCallback(
    (e: MouseEvent) => {
      if (
        !isMouseDown ||
        !parent_elementRef.current ||
        !taskbar_elementRef.current
      )
        return;

      // const MAX_HEIGHT =
      //   window.innerHeight - taskbar_elementRef.current?.offsetHeight;
      const desktop_element = document.getElementById(
        "desktop"
      ) as HTMLDivElement;

      const MAX_HEIGHT =
        desktop_element.offsetHeight - desktop_element.offsetTop * -1;
      // const MAX_HEIGHT = desktop_element.offsetHeight
      // console.log(taskbar_elementRef.current.clientHeight + taskbar_elementRef.current.offsetHeight + taskbar_elementRef.current.scrollHeight)

      const MAX_WIDTH = window.innerWidth;

      const y = e.clientY - initCoords.y;
      const x = e.clientX - parentCoords.x - initCoords.x;

      const taskbar_height =
        taskbar_elementRef.current.offsetHeight +
        taskbar_elementRef.current.clientHeight +
        10;

      /** The height of the program from added to the mouse Y position. */
      const PROGRAM_HEIGHT = parent_elementRef.current.offsetHeight + y;

      /** The width of the program from added to the mouse X position. */
      const PROGRAM_WIDTH = parent_elementRef.current.offsetWidth + x;
      // console.log( e.clientY - initCoords.y, desktop_element.offsetHeight)

      //! makes sure the program dosent go past the taskbar
      if (PROGRAM_HEIGHT < MAX_HEIGHT && y > taskbar_height) {
        parent_elementRef.current.style.top = y + "px";
      }

      //! Makes sure the program is in between the min width of the window
      // ! and dosent exceed the max width of the window
      if (
        PROGRAM_WIDTH < MAX_WIDTH &&
        PROGRAM_WIDTH > parent_elementRef.current.offsetWidth
      ) {
        parent_elementRef.current.style.left = x + "px";
      }
    },
    [initCoords, parentCoords, isMouseDown]
  );

  const mousedown = useCallback(
    (e: MouseEvent) => {
      if (extra_params) {
        router.replace(
          `/desktop?program=${program_name}${extra_params}`,
          undefined,
          {
            shallow: true,
          }
        );
      } else {
        router.replace(`/desktop?program=${program_name}`, undefined, {
          shallow: true,
        });
      }
      setInitCoords((prev) => (prev = { x: e.offsetX, y: e.offsetY }));
      setisMouseDown((prev) => true);

      if (activeProgramId !== program_id) {
        changeActiveProgram({ program_id });
      }
    },
    [
      isMouseDown,
      initCoords,
      changeActiveProgram,
      program_id,
      router,
      program_name,
    ]
  );

  const parentMousedown = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        setParentCoords((prev) => (prev = { x: e.offsetX, y: e.offsetY }));
      }
    },
    [parentCoords]
  );

  const mouseup = useCallback((e: MouseEvent) => {
    // isMouseDown.current = false;
    setisMouseDown((prev) => false);
    setInitCoords((prev) => (prev = { x: 0, y: 0 }));
    setParentCoords((prev) => (prev = { x: 0, y: 0 }));
  }, []);

  useEffect(() => {
    //! assign taskbar element to ref
    const element = document.getElementById(element_id) as HTMLElement;
    taskbar_elementRef.current = element;
    element?.addEventListener("mousedown", mousedown);

    //! assign parent element to ref
    parent_elementRef.current = document.getElementById(
      parent_id as string
    ) as HTMLElement;

    window.addEventListener("mousemove", drag);
    parent_elementRef.current.addEventListener("mousedown", parentMousedown);
    window.addEventListener("mouseup", mouseup);
    // if (!disabled) {
    // }

    return () => {
      window.removeEventListener("mousemove", drag);
      window.removeEventListener("mouseup", mouseup);
      element?.removeEventListener("mousedown", mousedown);
      parent_elementRef.current?.removeEventListener(
        "mousedown",
        parentMousedown
      );
    };
  }, [mousedown, mouseup, drag, element_id, parentMousedown, parent_id]);

  if (disabled) return;
};
