import { useState } from "react";

export const useInputTextSection = (onChange: (text: string) => void) => {
  const [charCount, setCharCount] = useState(0);

  const handleOnChange = (text: string) => {
    setCharCount(text.length);
    onChange(text);
  };

  return {
    charCount,
    handleOnChange,
  };
};
