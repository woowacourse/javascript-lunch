import IRestaurant from "../type/IRestaurant";

const makeArray = (json: string) => {
  const arr = JSON.parse(json);
  try {
    if (Array.isArray(arr)) {
      return arr ?? [];
    }
    return [];
  } catch (err) {
    return [];
  }
};

const LocalStorage = {
  getLocalStorage(key: string) {
    const json = localStorage.getItem(key);
    if (json === null) {
      return [];
    }
    return makeArray(json);
  },
  setLocalStorage(key: string, value: IRestaurant[]) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  },
};
export default LocalStorage;
