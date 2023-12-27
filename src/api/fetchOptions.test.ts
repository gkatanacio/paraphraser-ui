import { mock } from "node:test";
import { describe, it, expect } from 'vitest';

import { fetchProviders, fetchTones } from "./fetchOptions";

const dummySuccessResponse = {
  status: 200,
  ok: true,
  json: async () => {
    return {};
  },
};

describe("fetchProviders", () => {
  it("makes the expected fetch call to server", async () => {
    mock.method(global, "fetch", async (url: string) => {
      expect(url).toEqual(`${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/providers`);
      return dummySuccessResponse;
    });

    await fetchProviders();

    mock.reset();
  });
});

describe("fetchTones", () => {
  it("makes the expected fetch call to server", async () => {
    mock.method(global, "fetch", async (url: string) => {
      expect(url).toEqual(`${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/tones`);
      return dummySuccessResponse;
    });

    await fetchTones();

    mock.reset();
  });
});
