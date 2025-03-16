export const storageHandler = {
  getItem: (data) => JSON.parse(localStorage.getItem(data) ?? "[]") || [],
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  deleteItem: (key, value) => {
    const newData = storageHandler
      .getItem(key)
      .filter((item) => item.id !== value);

    storageHandler.setItem(key, newData);
  },
  filterItem: (key, category, sort, id = "") => {
    let restaurantData;
    if (id === "all") {
      restaurantData = storageHandler.getItem(key);
    } else if (id === "favorite") {
      restaurantData = storageHandler
        .getItem(key)
        .filter((item) => item.isFavorite === true);
    }

    if (!category && sort === "distance") {
      return restaurantData.sort((a, b) => a[sort] - b[sort]);
    }

    if (!category) {
      return restaurantData.sort((a, b) =>
        a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
      );
    }

    const categoryData = restaurantData.filter(
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
};
