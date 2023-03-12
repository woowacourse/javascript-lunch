import { Restaurant } from "../type/restaurant";

const LocalStorage = {
  setItem(initialCount: number) {
    let cnt = initialCount;

    return function (restaurantInfo: Restaurant) {
      localStorage.setItem(String(cnt), JSON.stringify(restaurantInfo));
      cnt += 1;
    };
  },

  getItems() {
    return Object.values(window.localStorage).map((item) => JSON.parse(item));
  },

  remove(targetName: string) {
    for (let key in localStorage) {
      if (JSON.parse(localStorage[key]).name === targetName) {
        localStorage.removeItem(key);
      }
    }
  },
};

export default LocalStorage;
