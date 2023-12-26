import { useState } from "react";

import { paraphrase } from "../api/paraphraser";

export const useApp = (defaultProvider: string, defaultTone: string) => {
  const [alertMsg, setAlertMsg] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(defaultProvider);
  const [selectedTone, setSelectedTone] = useState(defaultTone);
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

  return {
    alertMsg,
    alertVisible,
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
  }
};
