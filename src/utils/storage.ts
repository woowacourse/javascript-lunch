import storeData from "../data/storeData.js";
import IList from "../interfaces/IList.interface.js";

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

  getStorageItems: (): IList[] | null => {
    let items = [];
    const keys = Object.keys(window.localStorage);
    for (const key of keys) {
      const item = window.localStorage.getItem(key);
      if (item) items.push(JSON.parse(item));
    }
    return items;
  },

  updateIsFavorite(id: string) {
    const store = window.localStorage.getItem(JSON.stringify(id));
    console.log("store", store);
    if (store) {
      const jsonStore = JSON.parse(store);
      jsonStore.isFavorite = !jsonStore.isFavorite;
      window.localStorage.setItem(
        JSON.stringify(jsonStore.id),
        JSON.stringify(jsonStore)
      );
    }
  },
};

export default storage;
