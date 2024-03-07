const convertObjectToOptions = (
  filterLiteralObject: Record<string, string>
) => {
  return Object.entries(filterLiteralObject).map(([key, value]) => ({
    value: key,
    label: value,
  }));
};

export default convertObjectToOptions;
