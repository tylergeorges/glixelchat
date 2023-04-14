import { useEffect } from "react";
import { PixelJSON } from "./Editor";

export const RenderPix = ({
  pixel_coords,
  element_id,
}: {
  pixel_coords: PixelJSON;
  element_id: string;
}) => {
  const artFromJson = (ctx: CanvasRenderingContext2D) => {
    Object.entries(pixel_coords).forEach((val, idx) => {
      const yCoord = Number(val[0]);

      Object.entries(val[1]).forEach((col, idx) => {
        const xCoord = Number(col[0]);
        const color = col[1] as string;

        ctx.fillStyle = color;
        ctx.fillRect(
          xCoord * pixel_coords.cell_size,
          yCoord * pixel_coords.cell_size,
          pixel_coords.cell_size,
          pixel_coords.cell_size
        );
      });
    });
  };

  useEffect(() => {
    const parent_element = document.getElementById(element_id) as HTMLElement;
    const canvas = document.getElementById(
      "render-canvas"
    ) as HTMLCanvasElement;

    canvas.width = parent_element.clientWidth;
    canvas.height = parent_element.clientWidth;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    artFromJson(ctx);
  }, []);

  return <canvas className="w-full" id="render-canvas"></canvas>;
};
