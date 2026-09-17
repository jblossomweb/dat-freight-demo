const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string | undefined;

const getApiBaseUrl = (): string => {
  if (!API_BASE_URL) {
    throw new Error(
      'The API data source is not configured. ' +
      'Set API base URL environment variable and restart the app.',
    );
  }

  try {
    new URL(API_BASE_URL);
  } catch {
    throw new Error(
      'The API data source is malformed. It must be a valid URL. ' +
      'Set API base URL environment variable and restart the app.',
    );
  }

  // validate it via the URL cast above, but return a string
  return API_BASE_URL;
};

export default getApiBaseUrl;
