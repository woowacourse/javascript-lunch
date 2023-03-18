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
    Object.keys(localStorage).forEach((key: string) => {
      if (JSON.parse(localStorage[key]).name === targetName) {
        localStorage.removeItem(key);
      }
    });
  },
};

export default LocalStorage;
