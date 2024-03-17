import RestaurantItem from '../components/RestaurantItem';
import { $ } from '../utils/dom';

class RestaurantList {
  #element;
  #restaurantsInstance;

  constructor({ targetId, restaurantsInstance }) {
    this.#element = $(targetId);
    this.#restaurantsInstance = restaurantsInstance;
  }

  render() {
    const restaurantListHTML = this.#restaurantsInstance.standardList.reduce(
      (acc, restaurantData) => {
        return (
          acc +
          new RestaurantItem({
            element: this.#element,
            restaurantsInstance: this.#restaurantsInstance,
            restaurant: restaurantData,
          }).getTemplate()
        );
      },
      '',
    );

    this.#element.innerHTML = restaurantListHTML;
  }
}

export default RestaurantList;
