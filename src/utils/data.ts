export function parseJSON(data: string) {
  return JSON.parse(data);
}

export function stringifyJSON<T>(data: T): string {
  return JSON.stringify(data);
}

export function parseStorageKey(prefix: string, key: number) {
  return `${prefix}${key}`;
}
