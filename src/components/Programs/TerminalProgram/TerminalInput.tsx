import { useHandleCaret } from "@hooks";
import { useState, useCallback } from "react";

export const TerminalInput = () => {
  const [term_text, setTermText] = useState("");
  useHandleCaret({ term_text });

  const handleTextInput = useCallback((e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    setTermText(e.target.value);
  }, []);

  return (
    <div className="flex  h-full w-full  ">
      <div
        id="term-text"
        className=" mt-3 grid h-full w-full items-end whitespace-pre-wrap break-all p-2 "
      >
        <span>
          {">"} {term_text}
          <span
            id="caret"
            className="absolute h-5  bg-white  text-[rgba(0,0,0,0)] "
          >
            ..
          </span>
        </span>
        {/* <span id="term-placeholder">||</span> */}
        {/* <span
            ref={caret_ref}
            id="caret"
            className=" ml-[0.5px] text-[rgba(0,0,0,0)]  bg-white "
          >
            ..
          </span> */}
        {/* <div
            id="caret"
            className={`
              relative
              w-3 h-6
            bg-pink ${term_text.length == 0 ? "ml-2" : "ml-[0.5px]"}`}
          /> */}
      </div>

      <input
        id="text-input"
        className={`absolute top-10 left-0  flex h-full  w-full justify-start text-justify  opacity-0`}
        onInput={handleTextInput}
        value={term_text}
      />
    </div>
  );
};
