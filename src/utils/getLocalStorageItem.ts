const getLocalStorageItem = (key: string, defaultValue: any) => {
  const localStorage = window.localStorage;

  const valueInLocalStorage = localStorage.getItem(key);
  if (valueInLocalStorage === null) {
    localStorage.setItem(key, defaultValue);

    const stringifiedDefaultValue = JSON.stringify(defaultValue);

    localStorage.setItem(key, stringifiedDefaultValue);
  }

  return JSON.parse(localStorage.getItem(key) as string);
};

export default getLocalStorageItem;
