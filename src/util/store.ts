import "../types/restaurant";

const store = {
  setLocalStorage(list: []): void {
    localStorage.setItem("list", JSON.stringify(list));
  },

  getLocalStorage(): object[] {
    const item = localStorage.getItem("list");
    if (!item) return [];
    return JSON.parse(item);
  },

  addRestaurant(newRestaurant: RestaurantInfo): void {
    const list = this.getLocalStorage();
    localStorage.setItem("list", JSON.stringify([...list, newRestaurant]));
  },
};

export default store;
