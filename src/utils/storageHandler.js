export const storageHandler = {
  getItem: (data) => JSON.parse(localStorage.getItem(data) ?? "[]") || [],
  setItem: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  deleteItem: (key, value) => {
    const newData = JSON.parse(localStorage.getItem(key)).filter(
      (item) => item.id !== value
    );

    localStorage.setItem(key, JSON.stringify(newData));
  },
};
