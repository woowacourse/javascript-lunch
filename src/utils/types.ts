export const isObjectWithKeys = <T extends object>(item: object, candidates: string[]): item is T => {
  return Object.keys(item).every((key) => candidates.includes(key));
};

export const isArrayElement = <T extends string>(options: string[], target: string): target is T => {
  return options.includes(target);
};
