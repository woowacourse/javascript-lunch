export const sortByName = (names: string[]) => {
  return [...names].sort();
};

export const sortByNumber = (numbers: number[]) => {
  return [...numbers].sort((prev: number, next: number) => prev - next);
};
