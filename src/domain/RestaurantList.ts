import RestaurantType from "../../types/restaurant.ts";
import Restaurant from "./Restaurant.ts";

class RestaurantList {
  #restaurants = [] as Restaurant[];

  constructor(listItemContents: RestaurantType[]) {
    this.loadRestaurants(listItemContents);
  }

  // 로컬 스토리지에서 데이터 불러오기
  loadRestaurants(listItemContents: RestaurantType[]): void {
    const storedRestaurants = localStorage.getItem("restaurants");
    if (storedRestaurants) {
      this.#restaurants = JSON.parse(storedRestaurants).map(
        ({ restaurant }: { restaurant: RestaurantType }) => new Restaurant(restaurant),
      );
    } else {
      this.#restaurants = listItemContents.map((listItemContent) => new Restaurant(listItemContent));
      this.updateLocalStorage();
    }
  }

  // 로컬스토리지 업데이트
  updateLocalStorage(): void {
    localStorage.setItem("restaurants", JSON.stringify(this.#restaurants));
  }

  // 음식점 이름을 바탕으로 인스턴스 찾기
  getRestaurantByName(restaurantName: string): Restaurant | undefined {
    return this.#restaurants.find(
      ({ restaurant }: { restaurant: RestaurantType }) => restaurant.name === restaurantName,
    );
  }

  // 음식점 추가하기
  addRestaurant(restaurant: RestaurantType): void {
    const newRestaurant = new Restaurant(restaurant);
    this.#restaurants.push(newRestaurant);
    this.updateLocalStorage();
  }

  // 음식점 삭제하기
  removeRestaurant(restaurantName: string): void {
    this.#restaurants = this.#restaurants.filter(
      ({ restaurant }: { restaurant: RestaurantType }) => restaurant.name !== restaurantName,
    );
    this.updateLocalStorage();
  }

  // 좋아한 음식점 리스트 구하기
  getFavoriteRestaurants(): Restaurant[] {
    return this.#restaurants.filter(({ restaurant }: { restaurant: RestaurantType }) => restaurant.favoriteStar);
  }

  // 카테고리 필터링
  filterByCategory(category: string): Restaurant[] {
    if (category === "전체") return [...this.#restaurants];

    return this.#restaurants.filter(
      ({ restaurant }: { restaurant: RestaurantType }) => restaurant.category === category,
    );
  }

  // 정렬 필터링
  sortByOption(restaurants: Restaurant[], sortOption: "이름순" | "거리순") {
    if (sortOption === "이름순") {
      return [...restaurants].sort((a, b) => a.restaurant.name.localeCompare(b.restaurant.name));
    }

    if (sortOption === "거리순") {
      return [...restaurants].sort((a, b) => {
        const distanceA = parseInt(a.restaurant.distance.match(/\d+/)?.[0] || "0");
        const distanceB = parseInt(b.restaurant.distance.match(/\d+/)?.[0] || "0");
        if (distanceA === distanceB) {
          return a.restaurant.name.localeCompare(b.restaurant.name);
        }
        return distanceA - distanceB;
      });
    }

    return restaurants;
  }

  // 카테고리 + 정렬
  filterAndSort(category: string, sortOption: "이름순" | "거리순"): Restaurant[] {
    const filtered = this.filterByCategory(category);
    const filteredRestaurants = this.sortByOption(filtered, sortOption);

    return filteredRestaurants;
  }
}

export default RestaurantList;
