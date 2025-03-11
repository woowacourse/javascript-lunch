export function parseJSON(data: string) {
  return JSON.parse(data);
}

export function stringifyJSON<T>(data: T): string {
  return JSON.stringify(data);
}
