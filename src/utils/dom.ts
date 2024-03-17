export const $ = <E extends Element>(selector: string, baseElement: E | Document = document): E | null => {
  return baseElement.querySelector(selector) as E;
};
