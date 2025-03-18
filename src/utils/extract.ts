export function extractByKey<T, K extends keyof T>(
  list: readonly T[] | T[],
  key: K
): T[K][] {
  return list.map((item) => item[key]);
}

export function extractFormData(form: HTMLFormElement): {
  [k: string]: FormDataEntryValue;
} {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
