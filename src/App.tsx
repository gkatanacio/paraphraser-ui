import "./App.css";

import { Alert, Col, Container, Row } from "react-bootstrap";

import { DropEnd } from "./components/DropEnd";
import { InputTextSection } from "./components/InputTextSection";
import { OutputTextSection } from "./components/OutputTextSection";
import { RepoLinks } from "./components/RepoLinks";
import { Title } from "./components/Title";
import { useApp } from "./hooks/useApp";

const TEXTAREA_ROWS = 10;
const TEXTAREA_COLS = 75;

export const App = () => {
  const {
    alertMsg,
    alertVisible,
    providers,
    tones,
    selectedProvider,
    selectedTone,
    paraphraseResult,
    awaitingResult,
    historyIdx,
    handleSelectProvider,
    handleSelectTone,
    setTextToParaphrase,
    handleClickParaphrase,
    handleClickPrev,
    handleClickNext,
  } = useApp();

  return (
    <Container>
      <Title />
      <Row className="mb-3">
        <Col>
          <RepoLinks />
        </Col>
      </Row>
      {alertVisible && (
        <Row>
          <Col>
            <Alert variant="danger">{alertMsg}</Alert>
          </Col>
        </Row>
      )}
      <Row className="mb-3">
        <Col>
          <Row className="mb-2">
            <Col>
              <DropEnd
                label="Provider"
                onSelectOption={handleSelectProvider}
                options={providers}
                selectedOption={selectedProvider}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <DropEnd
                label="Tone"
                onSelectOption={handleSelectTone}
                options={tones}
                selectedOption={selectedTone}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col>
          <InputTextSection
            awaitingResult={awaitingResult}
            cols={TEXTAREA_COLS}
            onChange={setTextToParaphrase}
            onParaphrase={handleClickParaphrase}
            rows={TEXTAREA_ROWS}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <OutputTextSection
            awaitingResult={awaitingResult}
            cols={TEXTAREA_COLS}
            historyIdx={historyIdx}
            onNext={handleClickNext}
            onPrev={handleClickPrev}
            rows={TEXTAREA_ROWS}
            text={paraphraseResult}
          />
        </Col>
      </Row>
    </Container>
  );
};
