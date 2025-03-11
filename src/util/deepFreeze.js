export const deepFreeze = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  Object.freeze(obj);

  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (typeof obj[prop] === 'object' && obj[prop] !== null) {
      deepFreeze(obj[prop]);
    }
  });

  return obj;
};
