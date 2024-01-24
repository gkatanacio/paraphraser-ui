import { Button, Col, Row } from "react-bootstrap";
import { CopyToClipboard } from "react-copy-to-clipboard";

interface Props {
  awaitingResult: boolean;
  cols: number;
  historyIdx: number;
  onPrev: () => void;
  onNext: () => void;
  rows: number;
  text: string;
}

export const OutputTextSection = ({
  awaitingResult,
  cols,
  historyIdx,
  onPrev,
  onNext,
  rows,
  text,
}: Props) => {
  return (
    <>
      <Row>
        <Col>
          <label>
            <h5>Paraphrased</h5>
            <textarea cols={cols} readOnly rows={rows} value={text} />
          </label>
        </Col>
        <Col className="my-auto p-0">
          <CopyToClipboard text={text}>
            <button className="btn btn-sm btn-secondary">Copy</button>
          </CopyToClipboard>
        </Col>
      </Row>
      <Button
        disabled={!text || awaitingResult || historyIdx < 1}
        onClick={onPrev}
        size="sm"
        variant="outline-primary"
      >
        Previous Suggestion
      </Button>
      &nbsp;
      <Button
        disabled={!text || awaitingResult}
        onClick={onNext}
        size="sm"
        variant="outline-primary"
      >
        Next Suggestion
      </Button>
    </>
  );
};
