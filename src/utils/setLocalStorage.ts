const setLocalStorage = (key: string, item: any) => {
  const stringifiedItem = JSON.stringify(item);
  localStorage.setItem(key, stringifiedItem);
};

export default setLocalStorage;
