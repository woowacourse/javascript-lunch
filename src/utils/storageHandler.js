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
};
