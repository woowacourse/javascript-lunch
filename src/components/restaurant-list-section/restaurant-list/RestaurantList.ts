import { Restaurant } from "../../../../types";
import { RestaurantListItem } from "../../index";
import "./restaurantList.css";

interface RestaurantListCallbackProps {
  onToggleFavorite: (restaurantId: Restaurant["id"]) => void;
  onOpenDetail: (restaurantId: Restaurant["id"]) => void;
}

export default class RestaurantList {
  private restaurantList: Restaurant[];
  private onToggleFavorite: RestaurantListCallbackProps["onToggleFavorite"];
  private onOpenDetail: RestaurantListCallbackProps["onOpenDetail"];

  private $listSection: HTMLElement = document.createElement("section");
  private $list: HTMLUListElement = document.createElement("ul");

  constructor(
    restaurantList: Restaurant[],
    { onToggleFavorite, onOpenDetail }: RestaurantListCallbackProps
  ) {
    this.restaurantList = restaurantList;
    this.onToggleFavorite = onToggleFavorite;
    this.onOpenDetail = onOpenDetail;

    this.#initializeDOM();
  }

  #initializeDOM() {
    this.$listSection.className = "restaurant-list-container";
    this.$list.className = "restaurant-list";
    this.$listSection.append(this.$list);
  }

  render() {
    this.$list.innerHTML = "";
    this.restaurantList.forEach((restaurantInfo) => {
      const $listItem = new RestaurantListItem(
        restaurantInfo,
        this.onToggleFavorite,
        this.onOpenDetail
      );
      this.$list.append($listItem.render());
    });

    return this.$listSection;
  }

  updateRestaurantList(filteredRestaurants: Restaurant[]) {
    this.restaurantList = filteredRestaurants;
    this.render();
  }
}
