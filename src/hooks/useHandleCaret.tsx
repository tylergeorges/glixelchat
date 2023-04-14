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
export const useHandleCaret = ({ term_text }: HandleCaretProps) => {
  const handleKeyPress = useCallback(
    ({ ev, term_input }: HandleKeyPress) => {
      const caret = document.getElementById("caret") as HTMLSpanElement;

      const TEXT_LEN = term_text.length;
      const CARET_POS = term_input.selectionEnd;

      //   console.log(TEXT_LEN);

      const CARET_WIDTH = caret.offsetWidth / 4;

      const CARET_END_POS = Math.floor(CARET_WIDTH * TEXT_LEN);

      const CARET_STYLE_X = Number(caret.style.left.split("px")[0]);
      //   let caret_x = CARET_STYLE_X || caret.offsetLeft;
      let caret_x = caret.offsetLeft;
      //   let caret_x = CARET_POS * CARET_WIDTH;
      //   const caret_x = caret.offsetLeft;
      // const caret_x = caret.offsetLeft;

      console.log(
        "CARET_POS: ",
        CARET_POS,
        "\n CARET_END_POS: ",
        CARET_END_POS,
        "\n caret_x: ",
        caret_x,
        "\n text_len: ",
        TEXT_LEN,
        "\n caret width: ",
        CARET_WIDTH,
        "\n CARET_POS: ",
        CARET_POS
      );
      switch (ev.keyCode) {
        case LEFT_ARROW: {
          if (caret_x > 0) {
            //   caret.style.position = "absolute";
            // caret_x -= CARET_WIDTH;
            // caret_x -= CARET_WIDTH;

            caret_x -= CARET_WIDTH;
            // console.log(caret_x, CARET_WIDTH);
            // caret.style.left = CARET_POS * CARET_WIDTH + "px";
            caret.style.left = caret_x + "px";
          }
          // caret.style.left = caret_x + "px";
          break;
        }
        case RIGHT_ARROW:
          {
            console.log(caret_x / CARET_WIDTH)
            // if (caret_x / CARET_WIDTH < CARET_POS) {
              // caret.style.position = "absolute";
              caret_x += CARET_WIDTH;
              //   caret_x += CARET_WIDTH;
              //   console.log(caret_x, CARET_WIDTH);

              caret.style.left = caret_x + "px";
            // }
            // caret.style.left = caret_x + "px";
          }
          break;

        default: {
          //! means we are typing just not hitting arrow keys
          // caret.style.left = "";
          // if (CARET_STYLE_X !== CARET_POS && caret_x < TEXT_CARET_LEN) {
          //   //   caret.style.left = caret_x + CARET_WIDTH + "px";
          //   caret.style.left = CARET_POS * CARET_WIDTH + "px";
          // }
        }
      }
      //   caret.style.left = caret_x + "px";
    },
    [term_text]
  );

  useEffect(() => {
    const term_input = document.getElementById(
      "text-input"
    ) as HTMLTextAreaElement;

    // const TEXT_LEN = term_input.textContent?.length as number;
    // const CARET_POS = term_input.selectionStart;

    document.addEventListener("keydown", (ev) =>
      handleKeyPress({ ev, term_input })
    );
  }, [handleKeyPress, term_text]);
};
