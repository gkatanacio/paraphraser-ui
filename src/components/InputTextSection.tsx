import { Button } from "./Button";
import { useInputTextSection } from "../hooks/useInputTextSection";

interface Props {
  rows: number;
  cols: number;
  awaitingResult: boolean;
  onChange: (text: string) => void;
  onParaphrase: () => void;
}

const maxChars = import.meta.env.VITE_MAX_PARAPHRASE_CHARS;

export const InputTextSection = ({
  rows,
  cols,
  awaitingResult,
  onChange,
  onParaphrase,
}: Props) => {
  const { charCount, handleOnChange } = useInputTextSection(onChange);

  return (
    <>
      <div>
        <label>
          <h5>Original</h5>
          <textarea
            maxLength={maxChars}
            rows={rows}
            cols={cols}
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </label>
        &nbsp;
        <span>
          {charCount}/{maxChars}
        </span>
      </div>
      <div>
        <Button
          onClick={onParaphrase}
          color="success"
          disabled={awaitingResult}
        >
          Paraphrase
        </Button>
      </div>
    </>
  );
};
