import { describe, expect, it } from "vitest";
import { mock } from "node:test";

import { anyObject } from "../utils/types";
import { paraphrase } from "./paraphraser";

describe("paraphrase", () => {
  it("makes the expected fetch call and returns result", async () => {
    const dummyResult = "I am currently experiencing hunger. May I inquire about the menu for this evening's meal?";

    mock.method(global, "fetch", async (url: string, reqOptions: anyObject) => {
      expect(reqOptions.method).toEqual("POST");
      expect(url).toEqual(`${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/paraphrase`);
      expect(reqOptions.headers["Content-Type"]).toEqual("application/json");

      return {
        status: 200,
        ok: true,
        json: async () => {
          return { result: dummyResult };
        },
      };
    });

    const result = await paraphrase({
      provider: "chatgpt",
      tone: "formal",
      text: "I'm hungry. What's for dinner?",
    });

    expect(result).toEqual(dummyResult);

    mock.reset();
  });

  it("throws error from response", async () => {
    const dummyError = "some error";
    
    mock.method(global, "fetch", async () => {
      return {
        status: 400,
        ok: false,
        json: async () => {
          return { error: dummyError };
        },
        headers: {
          get: () => {
            return "application/json";
          },
        },
      };
    });

    await expect(() => paraphrase({
      provider: "chatgpt",
      tone: "formal",
      text: "Hey there",
    })).rejects.toThrowError(dummyError);

    mock.reset();
  });
});
