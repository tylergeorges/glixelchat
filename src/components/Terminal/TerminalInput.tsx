import { useHandleCaret } from "../../hooks/useHandleCaret";
import { useState, useCallback } from "react";

export const TerminalInput = () => {
  const [term_text, setTermText] = useState("");
  useHandleCaret({ term_text });

  const handleTextInput = useCallback((e: React.BaseSyntheticEvent) => {
    e.preventDefault();

    setTermText(e.target.value);
  }, []);

  return (
    <div className="flex  w-[50%] h-full max-w-sm">
      <span
        id="term-text"
        className=" whitespace-pre-wrap h-3 w-full  justify-start break-all mt-3"
      >
        {">"} {term_text}
        <span>
          <span
            id="caret"
            className="absolute h-5  text-[rgba(0,0,0,0)]  bg-white "
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
      </span>

      <input
        id="text-input"
        className={`justify-start absolute opacity-0  flex text-justify  w-full h-full top-10  left-0`}
        onInput={handleTextInput}
        value={term_text}
      />
    </div>
  );
};
