export const createOptionElements = <T>(options: T[]) => {
  return Object.values(options)
    .map((optionValue) => {
      return `<option value=${optionValue}>${optionValue}</option>`;
    })
    .join("");
};
