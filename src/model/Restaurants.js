import RestaurantCard from "../components/restaurantCard";
import { $ } from "../utils/dom";
import { defaultRestaurants } from "../defaultRestaurants";
import { createElement } from "../utils/createElement";
import Restaurant from "./Restaurant";

class Restaurants {
  #restaurants;
  #filterType;

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
    const parsedData = JSON.parse(storedDataString);

    this.#restaurants = parsedData.map(
      (data) => new Restaurant({ ...data, favorite: data.favorite })
    );
  }

  addRestaurant = (restaurant) => {
    restaurant.grantId(this.#restaurants.length + 1);
    this.#restaurants.push(restaurant);
    this.#filterType.category = "all";

    this.filter();
  };

  deleteRestaurant = (id) => {
    this.#restaurants = this.#restaurants.filter((res) => res.info.id !== id);
  };

  changeState = (state) => {
    const sortType = [...Object.keys(state)];
    const sortState = state[sortType];

    this.#filterType[sortType] = sortState;
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

  #filterByCategory(restaurants) {
    if (this.#filterType.category === "all") return restaurants;

    return restaurants.filter(
      (restaurant) => restaurant.info.category === this.#filterType.category
    );
  }

  #sortByName(restaurants) {
    return restaurants.sort((a, b) => a.info.name.localeCompare(b.info.name));
  }

  #sortByDistance(restaurants) {
    return restaurants.sort((a, b) => a.info.distance - b.info.distance);
  }

  #renderRestaurants(restaurants) {
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
