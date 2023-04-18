import { useCallback, useEffect, useRef, useState } from "react";
import { useDesktopContext } from "@hooks";
import { useRouter } from "next/router";

/**The initial coordinates of where the cursor clicked.  */
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

interface UseDraggingProps {
  /**The id of the component that we want to listen to. */
  element_id: string;
  /** The id of the program that we want to make the active program.  */
  program_id: number;
  /** The id of the parent that we want to move when dragging. */
  parent_id?: string;
  /** The name of the program that we want to make the active program when dragging.  */
  program_name?: string;
  /** If dragging should be disabled
   *
   * Default - False
   */
  disabled?: boolean;
  /** Any extra query params we want to add to the URL that helps track the programs state. */
  extra_params?: string;
}
export const useDragging = ({
  element_id,
  parent_id,
  program_id,
  program_name,
  disabled,
  extra_params,
}: UseDraggingProps) => {
  const [isMouseDown, setisMouseDown] = useState(false);
  const router = useRouter();
  // Sets the program thats being dragged as the active program
  const { changeActiveProgram, activeProgramId } = useDesktopContext();
  const parent_elementRef = useRef<HTMLElement>();
  const taskbar_elementRef = useRef<HTMLElement>();
  // Initialize the initial coordinates to 0
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

      const desktop_element = document.getElementById(
        "desktop"
      ) as HTMLDivElement;

      const MAX_HEIGHT =
        desktop_element.offsetHeight - desktop_element.offsetTop * -1;

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
      changeActiveProgram,
      program_id,
      router,
      program_name,
      activeProgramId,
      extra_params,
    ]
  );

  /** Get the coordinates of the parent component that will get dragged. */
  const parentMousedown = useCallback(
    (e: MouseEvent) => {
      if (isMouseDown) {
        setParentCoords((prev) => (prev = { x: e.offsetX, y: e.offsetY }));
      }
    },
    //eslint-disable-next-line
    [parentCoords]
  );

  /** Listener for when the dragging stops. */
  const mouseup = useCallback((e: MouseEvent) => {
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
