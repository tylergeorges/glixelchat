import {
  Dispatch,
  LegacyRef,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDrawing } from "../../hooks/useDrawing";
import { CanvasHelper } from "./CanvasHelper";

export interface EditorProps {
  cell_size: number;
  element_id: string;
  pixelJson?: PixelJSON;
  setPixelJson?: Dispatch<any>;
  children?: ReactNode;
  rows?: number;
  columns?: number;
}

// const canvas_ele = document.getElementById("editor") as HTMLCanvasElement
// const ctx  = canvas_ele.getContext("2d")

// canvas_ele.addEventListener("click", (e) =>{

// })
export interface PixelJSON {
  cell_size: number;
  /**Y coord */
  [y: number]: {
    /**X coord */
    [x: number]: string;
  };
}

export const Editor = ({
  cell_size,
  rows,
  columns,
  children,
  element_id,
}: EditorProps) => {
  const [pixelJson, setPixelJson] = useState<PixelJSON>({
    cell_size: cell_size,
  });
  const [isFloating, setIsFloating] = useState(true);
  const { toggleEraseState } = useDrawing({
    cell_size,
    element_id,
    rows,
    columns,
    pixelJson,
    setPixelJson,
  });
  // useDrawing({ cell_size, rows, columns });
  return (
    <>
      <CanvasHelper json_art={pixelJson} toggleEraseState={toggleEraseState} />
      <canvas
        //   onClick={editor_click}
        id="editor"
        className={`bg-white ${isFloating ? "absolute self-center  z-30" : ""} `}
      />
    </>
  );
};
