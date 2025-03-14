import RestaurantCard from "../components/restaurantCard/index.js";
import { $ } from "../utils/dom.js";
import { defaultRestaurants } from "../defaultRestaurants.ts";
import { createElement } from "../utils/createElement.js";
import Restaurant from "./Restaurant.ts";
import { Category, RestaurantInfo } from "../../types/restaurant";

interface FilterType {
  category: Category | "all";
  option: "name" | "distance";
  favorite: boolean;
}

class Restaurants {
  #restaurants: Restaurant[];
  #filterType: FilterType;

  constructor() {
    this.#restaurants = [...defaultRestaurants];
    this.#filterType = {
      category: "all",
      option: "name",
      favorite: false,
    };
    this.#getFromLocalStorage();
    this.filter();
  }

  #setToLocalStorage() {
    const stringifyData = JSON.stringify(
      this.#restaurants.map((restaurant) => restaurant.toJSON())
    );

    localStorage.setItem("restaurants", stringifyData);
  }

  #getFromLocalStorage() {
    const storedDataString = localStorage.getItem("restaurants");
    if (storedDataString) {
      const parsedData = JSON.parse(storedDataString);

      this.#restaurants = parsedData.map(
        (data: RestaurantInfo) => new Restaurant(data)
      );
    }
  }

  addRestaurant = (restaurant: Restaurant) => {
    restaurant.grantId(this.#restaurants.length + 1);
    this.#restaurants.push(restaurant);
    this.#filterType.category = "all";

    this.filter();
  };

  deleteRestaurant = (id: number) => {
    this.#restaurants = this.#restaurants.filter((res) => res.info.id !== id);
  };

  changeState = (state: Partial<FilterType>) => {
    const sortType = Object.keys(state)[0];
    const sortState = state[sortType as keyof FilterType];

    if (sortType === "category") {
      this.#filterType.category = sortState as Category | "all";
    } else if (sortType === "option") {
      this.#filterType.option = sortState as "name" | "distance";
    } else if (sortType === "favorite") {
      this.#filterType.favorite = sortState as boolean;
    }

    this.filter();
  };

  filter = () => {
    const filtered = this.#filterByCategory(this.#filterByFavorite());
    if (this.#filterType.option === "name") this.#sortByName(filtered);
    if (this.#filterType.option === "distance") this.#sortByDistance(filtered);

    this.#renderRestaurants(filtered);
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

  #renderRestaurants(restaurants: Restaurant[]) {
    const ulTag = $(".restaurant-list");
    ulTag.replaceChildren();

    if (restaurants.length === 0) {
      ulTag.appendChild(
        createElement(`<div>등록된 식당이 존재하지 않습니다.</div>`)
      );
      return;
    }
    this.#setToLocalStorage();
    restaurants.forEach((restaurant) => {
      ulTag.appendChild(
        RestaurantCard(restaurant, () => this.filter(), this.deleteRestaurant)
      );
    });
  }
}

export default Restaurants;
