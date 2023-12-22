import { useState } from "react";

import "./App.css";
import { Title } from "./components/Title";
import { RepoLinks } from "./components/RepoLinks";
import { Alert } from "./components/Alert";
import { Dropdown } from "./components/Dropdown";
import { InputTextSection } from "./components/InputTextSection";
import { OutputTextSection } from "./components/OutputTextSection";
import { paraphrase } from "./api/paraphraser";

const TEXTAREA_ROWS = 10;
const TEXTAREA_COLS = 75;

const PROVIDERS = ["chatgpt"];
const TONES = [
  "formal",
  "amicable",
  "fun",
  "casual",
  "sympathetic",
  "persuasive",
];

export const App = () => {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(PROVIDERS[0]);
  const [selectedTone, setSelectedTone] = useState(TONES[0]);
  const [textToParaphrase, setTextToParaphrase] = useState("");
  const [paraphraseResult, setParaphraseResult] = useState("");
  const [awaitingResult, setAwaitingResult] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);

  const clearResults = () => {
    setParaphraseResult("");
    setHistory([]);
    setHistoryIdx(-1);
  };

  const handleSelectProvider = (provider: string) => {
    if (provider === selectedProvider) {
      return;
    }
    setSelectedProvider(provider);
    clearResults();
  };

  const handleSelectTone = (tone: string) => {
    if (tone === selectedTone) {
      return;
    }
    setSelectedTone(tone);
    clearResults();
  };

  const attemptParaphrase = async (
    successCallback: (result: string) => void
  ) => {
    setAlertVisible(false);
    setAwaitingResult(true);
    try {
      const result = await paraphrase({
        text: textToParaphrase,
        provider: selectedProvider,
        tone: selectedTone,
      });
      setParaphraseResult(result);
      successCallback(result);
    } catch (error: unknown) {
      if (!(error instanceof Error)) {
        throw error;
      }
      setAlertMsg(error.message);
      setAlertVisible(true);
    } finally {
      setAwaitingResult(false);
    }
  };

  const handleClickParaphrase = async () => {
    attemptParaphrase((result) => {
      setHistory([result]);
      setHistoryIdx(0);
    });
  };

  const handleClickPrev = () => {
    if (historyIdx < 1) {
      console.error("unexpected historyIdx in prev handler:", historyIdx);
      return;
    }
    const prevIdx = historyIdx - 1;
    setParaphraseResult(history[prevIdx]);
    setHistoryIdx(prevIdx);
  };

  const handleClickNext = async () => {
    // if most recent already, fetch a new paraphrase result
    if (historyIdx === history.length - 1) {
      attemptParaphrase((result) => {
        setHistory([...history, result]);
        setHistoryIdx(historyIdx + 1);
      });
      return;
    }

    const nextIdx = historyIdx + 1;
    setParaphraseResult(history[nextIdx]);
    setHistoryIdx(nextIdx);
  };

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
                options={PROVIDERS}
                selectedOption={selectedProvider}
                onSelectOption={handleSelectProvider}
              />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Dropdown
                label="Tone"
                options={TONES}
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
