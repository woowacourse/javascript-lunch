const getLocalStorageItem = (key: string) => {
  const localStorage = window.localStorage;

  return JSON.parse(localStorage.getItem(key) as string);
};

export default getLocalStorageItem;
