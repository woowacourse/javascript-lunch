type Category = '한식' | '중식' | '일식' | '아시안' | '양식' | '기타';

interface Restaurant {
  category: Category;
  name: string;
  distance: 5 | 10 | 15 | 20 | 30;
  description?: string;
  link?: string;
}

class RestaurantManager {
  #restaurants: Array<Restaurant> = [];

  get restaurants() {
    return [...this.#restaurants];
  }

  add(restaurant: Restaurant) {
    this.#restaurants.push(restaurant);
  }

  filterByCategory(category: Category): Restaurant[] {
    return this.restaurants.filter((restaurant) => restaurant.category === category);
  }

  sortByName(): Restaurant[] {
    return this.restaurants.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  }

  sortByDistance(): Restaurant[] {
    return this.restaurants.sort((a, b) => {
      if (a.distance > b.distance) return 1;
      if (a.distance < b.distance) return -1;
      return 0;
    });
  }
}

export default RestaurantManager;
