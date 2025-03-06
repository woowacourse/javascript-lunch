import CATEGORY from '../constant/category.js';

const RESTAURANT_INFO_TEMPLATE = (name, distance, description) => {
  return `
    <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distance}</span>
    <p class="restaurant__description text-body">${description}</p>
`;
};

class RestaurantInfo {
  constructor(name, distance, description) {
    return this.#createRestaurantInfo(name, distance, description);
  }

  #createRestaurantInfo = (name, distance, description) => {
    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList = 'restaurant__info';
    restaurantInfo.innerHTML = RESTAURANT_INFO_TEMPLATE(name, distance, description);

    return restaurantInfo;
  };
}

export default RestaurantInfo;
