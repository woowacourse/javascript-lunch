export const storageHandler = {
  getItem: (data) => JSON.parse(localStorage.getItem(data) ?? "[]") || [],
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  deleteItem: (key, value) => {
    const newData = JSON.parse(localStorage.getItem(key)).filter(
      (item) => item.id !== value
    );

    localStorage.setItem(key, JSON.stringify(newData));
  },
  filterItem: (key, category, sort) => {
    if (!category) {
      if (sort === "distance") {
        return JSON.parse(localStorage.getItem(key)).sort(
          (a, b) => a[sort] - b[sort]
        );
      }
      return JSON.parse(localStorage.getItem(key)).sort((a, b) =>
        a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
      );
    }

    const newData = JSON.parse(localStorage.getItem(key)).filter(
      (item) => item.categoryTitle === category
    );

    if (sort === "distance") {
      return newData.sort((a, b) => a[sort] - b[sort]);
    }

    return newData.sort((a, b) =>
      a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
    );
  },
  updateFavorite: (key, restaurantInfo) => {
    const favoriteItem = JSON.parse(localStorage.getItem(key)).filter(
      (item) => item.id === restaurantInfo.id
    );

    const updateData = JSON.parse(localStorage.getItem(key)).map((item) => {
      if (item.id === restaurantInfo.id) {
        restaurantInfo.isFavorite = !favoriteItem[0].isFavorite;
        return restaurantInfo;
      }

      return item;
    });
    localStorage.setItem(key, JSON.stringify(updateData));

    return favoriteItem.length > 0 ? favoriteItem[0].isFavorite : null;
  },
  findFavoriteItem: (key, category, sort) => {
    const favoriteItems = JSON.parse(localStorage.getItem(key)).filter(
      (item) => item.isFavorite === true
    );
    if (!category) {
      if (sort === "distance") {
        return favoriteItems.sort((a, b) => a[sort] - b[sort]);
      }
      return favoriteItems.sort((a, b) =>
        a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
      );
    }

    const newData = favoriteItems.filter(
      (item) => item.categoryTitle === category
    );

    if (sort === "distance") {
      return newData.sort((a, b) => a[sort] - b[sort]);
    }

    return newData.sort((a, b) =>
      a[sort].toLowerCase() < b[sort].toLowerCase() ? -1 : 1
    );
  },
};
