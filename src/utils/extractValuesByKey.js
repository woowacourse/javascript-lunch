export const extractValuesByKey = (obj, valueKey) =>
  Object.entries(obj).reduce((acc, [key, value]) => {
    acc[key] = value[valueKey];
    return acc;
  }, {});
