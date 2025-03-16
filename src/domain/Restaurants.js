class Restaurants {
  #restaurantList;

  constructor(initialRestaurants = []) {
    this.#restaurantList = initialRestaurants;
  }

  getAll() {
    return this.#restaurantList;
  }

  add(restaurant) {
    this.#restaurantList.push(restaurant);
    return this.#restaurantList;
  }

  delete(restaurantName) {
    console.log(restaurantName);
    this.#restaurantList = this.#restaurantList.filter((restaurant) => restaurant.getName() !== restaurantName);
    console.log(this.#restaurantList);
    return this.#restaurantList;
  }

  updateLike(restaurantName, like) {
    const restaurant = this.#restaurantList.find((restaurant) => restaurant.getName() === restaurantName);

    if (restaurant) {
      restaurant.setLike(like);
    }

    return this.#restaurantList;
  }

  filter({ category, sorting, header } = {}) {
    let filteredList = [...this.#restaurantList];

    if (category && category !== '') {
      filteredList = filteredList.filter((restaurant) => {
        return restaurant.getCategory() === category;
      });
    }

    if (header === '자주 가는 음식점') {
      filteredList = filteredList.filter((restaurant) => {
        return restaurant.getLike() === true;
      });
    }

    if (sorting === 'name') {
      filteredList = filteredList.sort((a, b) => a.getName().localeCompare(b.getName()));
    } else if (sorting === 'distance') {
      filteredList = filteredList.sort((a, b) => Number(a.getDistance()) - Number(b.getDistance()));
    }

    return filteredList;
  }
}

export default Restaurants;
