import { CopyToClipboard } from "react-copy-to-clipboard";

import { Button } from "./Button";

interface Props {
  rows: number;
  cols: number;
  text: string;
  historyIdx: number;
  awaitingResult: boolean;
  onPrev: () => void;
  onNext: () => void;
}

export const OutputTextSection = ({
  rows,
  cols,
  text,
  historyIdx,
  awaitingResult,
  onPrev,
  onNext,
}: Props) => {
  return (
    <>
      <div className="row">
        <div className="col" style={{ paddingRight: 0 }}>
          <label>
            <h5>Paraphrased</h5>
            <textarea rows={rows} cols={cols} value={text} readOnly />
          </label>
        </div>
        <div className="col my-auto" style={{ paddingLeft: 8 }}>
          <CopyToClipboard text={text}>
            <button className="btn btn-sm btn-secondary">Copy</button>
          </CopyToClipboard>
        </div>
      </div>
      <div>
        <span>
          <Button
            onClick={onPrev}
            disabled={!text || awaitingResult || historyIdx < 1}
          >
            Previous Suggestion
          </Button>
        </span>
        &nbsp;
        <span>
          <Button onClick={onNext} disabled={!text || awaitingResult}>
            Next Suggestion
          </Button>
        </span>
      </div>
    </>
  );
};
