import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;
  #filteredRestaurants;

  constructor(listItemContents) {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      this.#restaurants = JSON.parse(storedRestaurants).map(({ information }) => new Restaurant(information));
    } else {
      this.#restaurants = this.initialAddRestaurant(listItemContents);
      this.updateLocalStorage();
    }
  }

  initialAddRestaurant(listItemContents) {
    return listItemContents.map((listItemContent) => new Restaurant(listItemContent));
  }

  addRestaurant(restaurantInformation) {
    const newRestaurant = new Restaurant(restaurantInformation);
    this.#restaurants.push(newRestaurant);
    this.updateLocalStorage();
    return newRestaurant;
  }

  // 카테고리 필터링
  filterByCategory(category) {
    if (category === "전체") {
      this.#filteredRestaurants = [...this.#restaurants];
    } else {
      this.#filteredRestaurants = this.#restaurants.filter(({ information }) => information.category === category);
    }
  }

  // 정렬 필터링
  sortByOption(sortOption) {
    if (sortOption === "이름순") {
      this.#filteredRestaurants.sort((a, b) => a.information.name.localeCompare(b.information.name));
    } else if (sortOption === "거리순") {
      this.#filteredRestaurants.sort((a, b) => {
        const distanceA = parseInt(a.information.distance.match(/\d+/)[0]);
        const distanceB = parseInt(b.information.distance.match(/\d+/)[0]);
        return distanceA - distanceB;
      });
    }
  }

  filterAndSort(category, sortOption) {
    this.filterByCategory(category);
    this.sortByOption(sortOption);
    return [...this.#filteredRestaurants];
  }

  updateLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  get resaurants() {
    return [...this.#restaurants];
  }
}

export default RestaurantList;
