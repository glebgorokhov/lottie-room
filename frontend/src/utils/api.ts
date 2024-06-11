export function getApiUrl(url: string): string {
  return `${import.meta.env.VITE_API_ENDPOINT}${url}`;
}
