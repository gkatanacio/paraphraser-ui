export const fetchProviders = async (): Promise<string[]> => {
  const resp = await fetch(`${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/providers`);

  if (!resp.ok) {
    await handleUnsuccessful(resp);
  }

  const body = await resp.json();

  return body.providers;
};

export const fetchTones = async (): Promise<string[]> => {
  const resp = await fetch(`${import.meta.env.VITE_PARAPHRASER_API_BASE_URL}/tones`);

  if (!resp.ok) {
    await handleUnsuccessful(resp);
  }

  const body = await resp.json();

  return body.tones;
};

const handleUnsuccessful = async (resp: Response) => {
  const text = await resp.text();
  console.error("unsuccessful response from paraphraser API", resp.status, text);
  throw new Error(text); 
};
