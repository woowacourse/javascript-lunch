import { renderElement, selectElement } from '../utils/dom.ts';

interface RestaurantItems {
  restaurants: () => string;
}

type RestaurantEventHandlers = ((event?: Event) => void)[];

const restaurantItems = {
  render({ restaurants }: RestaurantItems) {
    const restaurantsContent = restaurants();
    const ul = selectElement('.restaurant-list');

    if (ul.hasChildNodes()) {
      ul.replaceChildren();
    }

    renderElement('.restaurant-list', restaurantsContent);
  },

  setEvent(eventHandlers: RestaurantEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default restaurantItems;
