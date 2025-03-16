import { STORAGE_KEY_NAME } from "../constants/storage.js";

export const storageHandler = {
  getItem: (data) => JSON.parse(localStorage.getItem(data) ?? "[]") || [],
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  deleteItem: (key, value) => {
    const newData = storageHandler
      .getItem(key)
      .filter((item) => item.id !== value);

    storageHandler.setItem(key, newData);
  },
  filterItem: (key, category, sort) => {
    const allData = storageHandler.getItem(key);

    if (!category && sort === "distance") {
      return allData.sort((a, b) => a[sort] - b[sort]);
    }

    if (!category) {
      return allData.sort((a, b) =>
        a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
      );
    }

    const categoryData = allData.filter(
      (item) => item.categoryTitle === category
    );

    if (sort === "distance") {
      return categoryData.sort((a, b) => a[sort] - b[sort]);
    }

    return categoryData.sort((a, b) =>
      a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
    );
  },
  updateFavorite: (key, restaurantInfo) => {
    const favoriteData = storageHandler
      .getItem(key)
      .filter((item) => item.id === restaurantInfo.id);

    const updateData = storageHandler.getItem(key).map((item) => {
      if (item.id === restaurantInfo.id) {
        restaurantInfo.isFavorite = !favoriteData[0].isFavorite;
        return restaurantInfo;
      }

      return item;
    });

    storageHandler.setItem(key, updateData);

    return favoriteData.length > 0 ? favoriteData[0].isFavorite : null;
  },
  findFavoriteItem: (key, category, sort) => {
    const favoriteData = storageHandler
      .getItem(key)
      .filter((item) => item.isFavorite === true);

    if (!category && sort === "distance") {
      return favoriteData.sort((a, b) => a[sort] - b[sort]);
    }

    if (!category) {
      return favoriteData.sort((a, b) =>
        a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
      );
    }

    const categoryData = favoriteData.filter(
      (item) => item.categoryTitle === category
    );

    if (sort === "distance") {
      return categoryData.sort((a, b) => a[sort] - b[sort]);
    }

    return categoryData.sort((a, b) =>
      a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
    );
  },
};
