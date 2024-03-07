export const createOptionElements = (options: unknown[]) => {
  return Object.values(options)
    .map((optionValue) => {
      return `<option value=${optionValue}>${optionValue}</option>`;
    })
    .join("");
};
