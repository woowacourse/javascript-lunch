export const createOptionElements = <T>(
  options: T[],
  callback?: (optionValue: T) => T | number | string
) => {
  return Object.values(options)
    .map((optionValue) => {
      return `<option value=${optionValue}>${
        callback ? callback(optionValue) : optionValue
      }</option>`;
    })
    .join("");
};
