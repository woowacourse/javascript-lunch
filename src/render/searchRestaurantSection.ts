import { CustomRestaurantTypeSection, CustomSearchRestaurantSection } from '../components';

const searchRestaurantSection = {
  open: () => {
    const $searchRestaurantSection = document.querySelector<CustomSearchRestaurantSection>(
      'r-search-restaurant-section',
    );
    const $restaurantTypeSection = document.querySelector<CustomRestaurantTypeSection>(
      'r-restaurant-type-section',
    );

    if ($searchRestaurantSection || !$restaurantTypeSection) return;

    $restaurantTypeSection.insertAdjacentHTML(
      'afterend',
      `<r-search-restaurant-section></r-search-restaurant-section>`,
    );
  },

  close: () => {
    const $searchRestaurantSection = document.querySelector<CustomSearchRestaurantSection>(
      'r-search-restaurant-section',
    );

    if (!$searchRestaurantSection) return;

    $searchRestaurantSection.remove();
  },
};

export default searchRestaurantSection;
