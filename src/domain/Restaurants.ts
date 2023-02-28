type Category = "한식" | "중식" | "일식" | "아시안" | "양식" | "기타";
type Distance = 5 | 10 | 15 | 20 | 30;

export interface Restaurant {
  category: Category;
  name: string;
  distance: Distance;
  description?: string;
  link?: string;
}

class Restaurants {
  #list;

  constructor(list: Restaurant[]) {
    this.#list = list;
  }

  getList() {
    return this.#list;
  }

  add(restaurant: Restaurant) {
    this.#list = [...this.#list, restaurant];
  }

  sortByName() {
    return [...this.#list].sort((first, second) =>
      first.name > second.name ? 1 : -1
    );
  }
}

export default Restaurants;
