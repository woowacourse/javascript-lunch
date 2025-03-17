import { Category } from "../../types/restaurant";
import Restaurant from "../model/Restaurant";

interface FilterType {
  category: Category | "all";
  option: "name" | "distance";
  favorite: boolean;
}

export class Filter {
  #filterType: FilterType;
  #restaurants: Restaurant[];

  constructor(restaurants: Restaurant[]) {
    this.#filterType = {
      category: "all",
      option: "name",
      favorite: false,
    };
    this.#restaurants = restaurants;
  }

  filterBySortType = <K extends keyof FilterType>(
    sortType: K,
    sortState: FilterType[K]
  ) => {
    this.#filterType[sortType] = sortState;

    return this.filter();
  };

  filter = () => {
    const filtered = this.#filterByCategory(this.#filterByFavorite());
    if (this.#filterType.option === "name") this.#sortByName(filtered);
    if (this.#filterType.option === "distance") this.#sortByDistance(filtered);

    return filtered;
  };

  #filterByFavorite() {
    if (this.#filterType.favorite) {
      return [...this.#restaurants].filter(
        (restaurant) => restaurant.info.favorite
      );
    }
    return [...this.#restaurants];
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
