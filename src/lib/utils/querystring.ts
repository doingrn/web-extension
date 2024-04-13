export function parseQuerystring(url: string): Record<string, string> {
  const query = new URLSearchParams(url.split('?')[1]);
  const result: Record<string, string> = {};
  for (const [key, value] of query) {
    result[key] = value;
  }
  return result;
}
