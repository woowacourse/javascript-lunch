export function extractByKey<T extends Record<string, any>>(
  list: readonly T[],
  key: string
): string[] {
  return list
    .map((item) => item[key])
    .filter((value): value is string => typeof value === "string");
}

export function extractFormData(form: HTMLFormElement) {
  const formData = new FormData(form);
  return Object.fromEntries(formData.entries());
}
