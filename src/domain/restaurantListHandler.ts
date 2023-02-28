type Category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";

interface Restaurant {
  category: Category;
  name: string;
  takingTime: number;
  description?: string;
  link?: string;
}

class RestaurantListHandler {
  restaurants: Restaurant[] = [];

  addRestaurant(restaurant: Restaurant) {
    this.restaurants.push(restaurant);
  }

  getSortedByName(): Restaurant[] {
    return [...this.restaurants].sort((a, b) =>
      a.name.localeCompare(b.name, "ko-KR")
    );
  }

  getSortedByTakingTime(): Restaurant[] {
    return [...this.restaurants].sort((a, b) => a.takingTime - b.takingTime);
  }
}

export default new RestaurantListHandler();
