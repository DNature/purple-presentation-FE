export const customFetch = async (url: string, options: RequestInit = {}) => {
  const withBaseUrl = `${process.env.BE_URL}${url}`;
  const withBaseOptions = {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  const response = await fetch(withBaseUrl, withBaseOptions);

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
};
