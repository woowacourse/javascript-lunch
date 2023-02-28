type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
type TakingTime = 5 | 10 | 15 | 20 | 25 | 30;

interface Restaurant {
  category: Category;
  name: string;
  takingTime: TakingTime;
  description?: string;
  link?: string;
}

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  getSortedByName(): Restaurant[] {
    return [...this.restaurants].sort((resA, resB) =>
      resA.name.localeCompare(resB.name, "ko-KR")
    );
  }

  getSortedByTakingTime(): Restaurant[] {
    return [...this.restaurants].sort(
      (resA, resB) => resA.takingTime - resB.takingTime
    );
  }

  getFilteredByCategory(category: Category): Restaurant[] {
    return [...this.restaurants].filter(
      (restaurant) => restaurant.category === category
    );
  }
}

export default new RestaurantListHandler();
