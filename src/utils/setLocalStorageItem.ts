const setLocalStorageItem = (key: string, value: any) => {
  const localStorage = window.localStorage;
  const stringifiedRestaurants = JSON.stringify(value);

  localStorage.setItem(key, stringifiedRestaurants);
};

export default setLocalStorageItem;
