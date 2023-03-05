import IRestaurant from "../type/IRestaurant";

const LocalStorage = {
  getLocalStorage(key: string) {
    const json = localStorage.getItem(key);
    if (json === null) {
      return [];
    }
    return JSON.parse(json) ?? [];
  },
  setLocalStorage(key: string, value: IRestaurant[]) {
    const json = JSON.stringify(value);
    localStorage.setItem(key, json);
  },
};
export default LocalStorage;
