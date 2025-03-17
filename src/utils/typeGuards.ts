export const isHTMLElement = (
  target: EventTarget | null
): target is HTMLElement => {
  return target instanceof HTMLElement;
};

export const isError = (value: unknown): value is Error => {
  return value instanceof Error;
};
