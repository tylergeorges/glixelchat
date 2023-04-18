import { FormEventHandler, useState } from "react";

export function InputWrapper({
  submit_callback,
}: {
  submit_callback: (text: string) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  function handleInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    setInputValue((prev) => e.target.value);
  }
  function handleSubmitCallback(e: React.SyntheticEvent) {
    e.preventDefault();
    submit_callback(inputValue);

    setInputValue((prev) => "");
  }
  return (
    <form
      className="flex h-1/6 w-full items-center justify-center bg-dark p-4"
      onSubmit={handleSubmitCallback}
    >
      <input
        placeholder={"Type something..."}
        className={`${
          inputValue.length < 255 ? "input" : "input-error"
        } h-14 w-full bg-lighter p-2 `}
        onChange={handleInput}
        type="text"
        value={inputValue}
      />
      <button type="submit" aria-label="Submit Post"/>
    </form>
  );
}
