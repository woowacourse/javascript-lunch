import storeData from "./storeData.js";

const storage = {
  setStorage: () => {
    if (window.localStorage.length === 0) {
      storeData.forEach((store) => {
        window.localStorage.setItem(
          JSON.stringify(store.id),
          JSON.stringify(store)
        );
      });
    }
  },

  getStorageItems: () => {
    let items = [];
    const keys = Object.keys(window.localStorage);
    for (const key of keys) {
      items.push(JSON.parse(window.localStorage.getItem(key)));
    }
    console.log(items);
    return items;
  },
};

export default storage;
