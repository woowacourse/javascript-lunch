import IRestaurant from "../type/IRestaurant";

const LocalStorage = {
  getLocalStorage(key: string) {
    const json = localStorage.getItem(key);
    if (json === null) {
      return [];
    }
    try {
      const arr = JSON.parse(json);
      if (Array.isArray(arr)) {
        return arr ?? [];
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  },
  setLocalStorage(key: string, value: IRestaurant[]) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  },
};
export default LocalStorage;
