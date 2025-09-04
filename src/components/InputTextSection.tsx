import { Button } from "react-bootstrap";

import { useInputTextSection } from "../hooks/useInputTextSection";

interface Props {
  awaitingResult: boolean;
  cols: number;
  onChange: (text: string) => void;
  onParaphrase: () => void;
  rows: number;
}

const maxChars = import.meta.env.VITE_MAX_PARAPHRASE_CHARS;

export const InputTextSection = ({
  awaitingResult,
  cols,
  onChange,
  onParaphrase,
  rows,
}: Props) => {
  const { charCount, handleOnChange } = useInputTextSection(onChange);

  return (
    <>
      <div>
        <label>
          <h5>Original</h5>
          <textarea
            cols={cols}
            maxLength={maxChars}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleOnChange(e.target.value)}
            rows={rows}
          />
        </label>
        &nbsp;
        <span>
          {charCount}/{maxChars}
        </span>
      </div>
      <div>
        <Button
          disabled={awaitingResult}
          onClick={onParaphrase}
          size="sm"
          variant="outline-success"
        >
          Paraphrase
        </Button>
      </div>
    </>
  );
};
