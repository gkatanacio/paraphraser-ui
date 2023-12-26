import "./App.css";
import { Title } from "./components/Title";
import { RepoLinks } from "./components/RepoLinks";
import { Alert } from "./components/Alert";
import { Dropdown } from "./components/Dropdown";
import { InputTextSection } from "./components/InputTextSection";
import { OutputTextSection } from "./components/OutputTextSection";
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
    <div className="container">
      <Title />
      <div className="row mb-3">
        <div className="col">
          <RepoLinks />
        </div>
      </div>
      {alertVisible && (
        <div className="row">
          <div className="col">
            <Alert>{alertMsg}</Alert>
          </div>
        </div>
      )}
      <div className="row mb-3">
        <div className="col">
          <div className="row mb-2">
            <div className="col">
              <Dropdown
                label="Provider"
                options={providers}
                selectedOption={selectedProvider}
                onSelectOption={handleSelectProvider}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Dropdown
                label="Tone"
                options={tones}
                selectedOption={selectedTone}
                onSelectOption={handleSelectTone}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col">
          <InputTextSection
            rows={TEXTAREA_ROWS}
            cols={TEXTAREA_COLS}
            awaitingResult={awaitingResult}
            onChange={setTextToParaphrase}
            onParaphrase={handleClickParaphrase}
          />
        </div>
      </div>
      <div className="row">
        <div className="col">
          <OutputTextSection
            rows={TEXTAREA_ROWS}
            cols={TEXTAREA_COLS}
            text={paraphraseResult}
            historyIdx={historyIdx}
            awaitingResult={awaitingResult}
            onPrev={handleClickPrev}
            onNext={handleClickNext}
          />
        </div>
      </div>
    </div>
  );
};
