import { Restaurant } from "../../../../types";
import BaseComponent from "../../../../util/BaseComponent";
import RestaurantItem from "./RestaurantItem";

interface Props {
  restaurants: Restaurant[];
  onItemClick: (id: number) => void;
  onFavoriteIconClick: (id: number) => void;
}
interface State {}
class RestaurantListSection extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $section = document.createElement("section");
    $section.classList.add("restaurant-list-container");
    super($section, props);
    this.state = {};
  }

  protected setEvent(): void {
    this.addEvent("li.restaurant", "click", (event: Event) => {
      if (event.target instanceof HTMLElement) {
        event;
      }
    });
  }

  protected compose(): void {
    const $ul = document.createElement("ul");
    $ul.classList.add("restaurant-list");

    const $restaurants = this.props.restaurants.map((restaurant) =>
      new RestaurantItem({
        restaurant,
        onItemClick: this.props.onItemClick,
        onFavoriteIconClick: this.props.onFavoriteIconClick,
      }).render()
    );

    $ul.append(...$restaurants);

    this.$root.appendChild($ul);
  }
}

export default RestaurantListSection;
