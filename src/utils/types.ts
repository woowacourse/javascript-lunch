export const isRestaurantItemType = <T extends object>(item: object, candidates: string[]): item is T => {
  return Object.keys(item).every((key) => candidates.includes(key));
};

export const isValidOption = <T extends string>(options: T[], value: string): value is T => {
  return options.includes(value as T);
};
