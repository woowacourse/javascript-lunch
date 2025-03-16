import Restaurant from "./Restaurant.js";

class RestaurantList {
  #restaurants;
  #filteredRestaurants;

  constructor(listItemContents) {
    this.loadRestaurants(listItemContents);
  }

  // 로컬 스토리지에서 데이터 불러오기
  loadRestaurants(listItemContents) {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      this.#restaurants = JSON.parse(storedRestaurants).map(({ restaurant }) => new Restaurant(restaurant));
    } else {
      this.#restaurants = listItemContents.map((listItemContent) => new Restaurant(listItemContent));
      this.updateLocalStorage();
    }
  }

  // 로컬스토리지 업데이트
  updateLocalStorage() {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  // 음식점 이름을 바탕으로 인스턴스 찾기
  getRestaurantByName(restaurantName) {
    return this.#restaurants.find(({ restaurant }) => restaurant.name === restaurantName);
  }

  // 음식점 추가하기
  addRestaurant(restaurantrestaurant) {
    const newRestaurant = new Restaurant(restaurantrestaurant);
    this.#restaurants.push(newRestaurant);
    this.#filteredRestaurants = [...this.#restaurants];
    this.updateLocalStorage();
  }

  // 음식점 삭제하기
  removeRestaurant(restaurantName) {
    this.#restaurants = this.#restaurants.filter(({ restaurant }) => restaurant.name !== restaurantName);
    this.updateLocalStorage();
  }

  // 좋아한 음식점 리스트 구하기
  getFavoriteRestaurants() {
    return this.#restaurants.filter(({ restaurant }) => restaurant.favoriteStar);
  }

  // 카테고리 필터링
  filterByCategory(category) {
    if (category === "전체") {
      this.#filteredRestaurants = [...this.#restaurants];
    } else {
      this.#filteredRestaurants = this.#restaurants.filter(({ restaurant }) => restaurant.category === category);
    }
  }

  // 정렬 필터링
  sortByOption(sortOption) {
    if (sortOption === "이름순") {
      this.#filteredRestaurants.sort((a, b) => a.restaurant.name.localeCompare(b.restaurant.name));
    } else if (sortOption === "거리순") {
      this.#filteredRestaurants.sort((a, b) => {
        const distanceA = parseInt(a.restaurant.distance.match(/\d+/)[0]);
        const distanceB = parseInt(b.restaurant.distance.match(/\d+/)[0]);
        if (distanceA === distanceB) return a.restaurant.name.localeCompare(b.restaurant.name);
        return distanceA - distanceB;
      });
    }
  }

  // 카테고리 + 정렬
  filterAndSort(category, sortOption) {
    this.filterByCategory(category);
    this.sortByOption(sortOption);
    return [...this.#filteredRestaurants];
  }
}

export default RestaurantList;
