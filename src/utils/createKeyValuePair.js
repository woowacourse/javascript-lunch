const createKeyValuePair = (keys, values) => {
  if (keys.length !== values.length) return;

  return keys.reduce((obj, key, index) => {
    obj[key] = values[index];

    return obj;
  }, {});
};

export default createKeyValuePair;
