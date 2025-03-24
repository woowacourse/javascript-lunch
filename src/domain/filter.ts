import { Category } from "../../types/restaurant";
import Restaurant from "../model/Restaurant";

interface FilterType {
  category: Category | "all";
  option: "name" | "distance";
  favorite: boolean;
}

export class Filter {
  #filterType: FilterType;

  constructor() {
    this.#filterType = {
      category: "all",
      option: "name",
      favorite: false,
    };
  }

  filterBySortType = <K extends keyof FilterType>(
    sortType: K,
    sortState: FilterType[K]
  ) => {
    this.#filterType[sortType] = sortState;

    // return this.filter();
  };

  filter = (restaurants: Restaurant[]) => {
    const filtered = this.#filterByCategory(
      this.#filterByFavorite(restaurants)
    );
    if (this.#filterType.option === "name") this.#sortByName(filtered);
    if (this.#filterType.option === "distance") this.#sortByDistance(filtered);

    return filtered;
  };

  #filterByFavorite(restaurants: Restaurant[]) {
    if (this.#filterType.favorite) {
      return restaurants.filter((restaurant) => restaurant.info.favorite);
    }
    return restaurants;
  }

  #filterByCategory(restaurants: Restaurant[]) {
    if (this.#filterType.category === "all") return restaurants;

    return restaurants.filter(
      (restaurant) => restaurant.info.category === this.#filterType.category
    );
  }

  #sortByName(restaurants: Restaurant[]) {
    return restaurants.sort((a, b) => a.info.name.localeCompare(b.info.name));
  }

  #sortByDistance(restaurants: Restaurant[]) {
    return restaurants.sort((a, b) => a.info.distance - b.info.distance);
  }
}
