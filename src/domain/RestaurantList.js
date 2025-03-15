class RestaurantList {
  #restaurantList = [];
  #currentCategory = "";
  #nameOrDistance = "";

  constructor(restaurantList = []) {
    this.#restaurantList = restaurantList;
  }

  add(restaurant) {
    this.#restaurantList.push(restaurant);
  }

  delete(restaurant) {
    this.#restaurantList = this.#restaurantList.filter(
      (item) => item !== restaurant
    );
  }

  filter() {
    let filteredList = this.#restaurantList;
    filteredList = this.filterByCategory(this.#currentCategory, filteredList);

    if (this.#nameOrDistance === "name") {
      return this.filterByName(filteredList);
    }
    if (this.#nameOrDistance === "distance") {
      return this.filterByDistance(filteredList);
    }

    return filteredList;
  }

  getFavoriteList() {
    const favoriteList = this.#restaurantList.filter(
      (restaurant) => restaurant.value.isFavorite
    );

    return favoriteList;
  }

  filterByCategory(category, list) {
    if (category === "") {
      return list;
    }

    return list.filter((restaurant) => restaurant.value.category === category);
  }

  filterByName(list) {
    return [...list].sort((a, b) => a.value.name.localeCompare(b.value.name));
  }

  filterByDistance(list) {
    return [...list].sort((a, b) => a.value.distance - b.value.distance);
  }

  setCategory(category) {
    this.#currentCategory = category;
  }

  setNameOrDistance(sortBy) {
    this.#nameOrDistance = sortBy;
  }

  get list() {
    return [...this.#restaurantList];
  }
}

export default RestaurantList;
