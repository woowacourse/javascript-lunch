const store = {
  setLocalStorage(list) {
    localStorage.setItem("list", JSON.stringify(list));
  },

  getLocalStorage() {
    const item = localStorage.getItem("list");
    if (!item) return [];
    return JSON.parse(localStorage.getItem("list"));
  },
};

export default store;
