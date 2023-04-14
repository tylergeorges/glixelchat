import { MouseEventHandler, Dispatch, SetStateAction } from "react";
import { PixelJSON } from "./Editor";

interface CanvasHelperProps {
  json_art: PixelJSON;
  toggleEraseState: () => void;
}

export const CanvasHelper = ({
  json_art,
  toggleEraseState,
}: CanvasHelperProps) => {
  const copyJSON = (e: React.SyntheticEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(JSON.stringify(json_art, undefined, 4));
  };

  
  return (
    <div className="bg-black border-2 border-white h-20 w-40 absolute top-36  flex justify-center">
      <button className="bg-pink p-4 self-center " onClick={copyJSON}>
        Copy
      </button>
      <button className="bg-pink p-4 self-center " onClick={toggleEraseState}>
        Erase
      </button>
    </div>
  );
};
