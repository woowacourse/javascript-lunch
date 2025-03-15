const storage = {
  saveRestaurantList(value) {
    localStorage.setItem("restaurnatList", JSON.stringify(value));
  },

  loadRestaurantList() {
    return JSON.parse(localStorage.getItem("restaurnatList"));
  },

  saveCategory(value) {
    localStorage.setItem("category", JSON.stringify(value));
  },

  loadCategory() {
    return JSON.parse(localStorage.getItem("category"));
  },

  saveNameOrDistance(value) {
    localStorage.setItem("nameOrDistance", JSON.stringify(value));
  },

  loadNameOrDistance() {
    return JSON.parse(localStorage.getItem("nameOrDistance"));
  },

  saveTabInfo(value) {
    localStorage.setItem("TabInfo", JSON.stringify(value));
  },

  loadTabInfo() {
    return JSON.parse(localStorage.getItem("TabInfo"));
  },
};

export default storage;
