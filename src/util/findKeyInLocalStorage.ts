export const findLocalStorageKeys = (keyName: string) =>
  Object.keys(localStorage).filter((key) => key.startsWith(keyName));
