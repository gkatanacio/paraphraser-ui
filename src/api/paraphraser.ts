export interface ParaphraseInput {
  provider: string;
  tone: string;
  text: string;
}

const headers: HeadersInit = {
  "Content-Type": "application/json",
};

export const paraphrase = async (input: ParaphraseInput): Promise<string> => {
  const endpoint = `${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/paraphrase`;

  const resp = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });

  if (!resp.ok) {
    const error = await getError(resp);
    console.error("unsuccessful response from paraphraser API", resp.status, error);
    throw new Error(error);
  }

  const body = await resp.json();

  return body.result;
};

const getError = async (resp: Response): Promise<string> => {
  const contentType = resp.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    const body = await resp.json();
    if (!body.error) {
      return "unexpected error structure";
    }
    return body.error;
  }

  return resp.text();
};
