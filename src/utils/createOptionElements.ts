export const createOptionElements = <T>(options: {
  contents: string[];
  values: T[];
}) => {
  const { contents: optionLabels, values: optionValues } = options;

  const optionsArray = optionLabels.map((label, index) => {
    return `<option value="${optionValues[index]}">${label}</option>`;
  });

  return optionsArray.join("");
};
