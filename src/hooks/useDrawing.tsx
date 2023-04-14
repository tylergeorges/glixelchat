import { Dispatch, useCallback, useEffect, useRef, useState } from "react";
import { EditorProps, PixelJSON } from "../components/PixelEditor/Editor";

interface DrawingProps {
  cell_size: number;
  rows: number;
  columns: number;
  element_id: string;
  pixelJson: PixelJSON;
  setPixelJson: Dispatch<any>;
}

export const useDrawing = ({
  cell_size,
  rows,
  columns,
  element_id,
  pixelJson,
  setPixelJson,
}: DrawingProps) => {
  const [color, setColor] = useState("#ff7eb6");
  const [isErasing, setIsErasing] = useState(false);
  //   const [isMouseDown, setIsMouseDown] = useState(false);
  const isMouseDown = useRef(false);
  const canvas = useRef<HTMLCanvasElement>();
  const draw = (e: MouseEvent) => {
    if (!isMouseDown.current || !canvas.current) return;

    const ctx = canvas.current.getContext("2d") as CanvasRenderingContext2D;

    const x = Math.floor(e.offsetX / cell_size);
    const y = Math.floor(e.offsetY / cell_size);

    if (!isErasing) {
      setPixelJson(
        (pixelJSON: PixelJSON) => ({
          ...pixelJSON,
          [y]: { ...pixelJSON[y], [x]: color },
        })
        // (pixelJSON) => ({...pixelJSON, [pixelJSON[y]]: { ...pixelJSON[y], [x]: color }})
        );
        ctx.fillStyle = color;
    } else {
      // delete pixelJson[y];
      ctx.fillStyle = "#ffffff";
    }

    ctx.fillRect(x * cell_size, y * cell_size, cell_size, cell_size);
  };

  const toggleEraseState = useCallback(() => {
    setIsErasing((prev) => !prev);

    if (isErasing) {
      setColor("#ffffff");
    } else [setColor("#ff7eb6")];
  }, [isErasing]);

  const handleMouseDown = (e: MouseEvent) => {
    isMouseDown.current = true;
    draw(e);
  };
  const handleMouseUp = (e: MouseEvent) => {
    isMouseDown.current = false;
  };

  useEffect(() => {
    canvas.current = document.getElementById("editor") as HTMLCanvasElement;
    const parent_element = document.getElementById(element_id) as HTMLElement;
    // canvas.current.height = cell_size * rows || parent_element.clientHeight;
    // canvas.current.width = cell_size * columns || parent_element.clientWidth;

    canvas.current.addEventListener("mousemove", draw);
    canvas.current.addEventListener("mousedown", handleMouseDown);
    canvas.current.addEventListener("mouseup", handleMouseUp);

    return () => {
      canvas.current?.removeEventListener("mousemove", draw);
      canvas.current?.removeEventListener("mousedown", handleMouseDown);
      canvas.current?.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isMouseDown.current]);

  return { toggleEraseState };
};
