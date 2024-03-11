export const createOptionElements = <T>(
  options: T[],
  callback: (optionValue: T) => T = (optionValue) => optionValue
) => {
  return Object.values(options)
    .map((optionValue) => {
      return `<option value=${optionValue}>${callback(optionValue)}</option>`;
    })
    .join("");
};
