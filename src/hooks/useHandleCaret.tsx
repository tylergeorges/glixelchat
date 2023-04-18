import { useEffect, useCallback } from "react";

const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;

interface HandleKeyPress {
  TEXT_LEN?: number;
  CARET_POS?: number;
  ev: KeyboardEvent;
  term_input: HTMLTextAreaElement;
}

interface HandleCaretProps {
  term_text: string;
}
/** Used for the Terminal Program. */
export const useHandleCaret = ({ term_text }: HandleCaretProps) => {
  const handleKeyPress = useCallback(({ ev }: HandleKeyPress) => {
    const caret = document.getElementById("caret") as HTMLSpanElement;

    const CARET_WIDTH = caret.offsetWidth / 4;

    let caret_x = caret.offsetLeft;

    switch (ev.keyCode) {
      case LEFT_ARROW: {
        if (caret_x > 0) {
          caret_x -= CARET_WIDTH;
          caret.style.left = caret_x + "px";
        }
        break;
      }
      case RIGHT_ARROW:
        {
          caret_x += CARET_WIDTH;

          caret.style.left = caret_x + "px";
        }
        break;
    }
  }, []);

  useEffect(() => {
    const term_input = document.getElementById(
      "text-input"
    ) as HTMLTextAreaElement;

    document.addEventListener("keydown", (ev) =>
      handleKeyPress({ ev, term_input })
    );
  }, [handleKeyPress, term_text]);
};
