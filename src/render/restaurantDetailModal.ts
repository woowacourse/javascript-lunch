import { CustomRestaurantDetailModalElement } from '../components';
import Restaurant, { RestaurantProps } from '../domain/Restaurant';
import errorHandler from '../utils/errorHandler';

const restaurantDetailModal = {
  open: (restaurant: Restaurant) => {
    const $restaurantDetailModal = `
      <r-restaurant-detail-modal
        category="${restaurant.getCategory()}"
        name="${restaurant.getName()}"
        distanceByMinutes="${restaurant.getDistanceByMinutes()}"
        description="${restaurant.getDescription() ?? ''}"
        referenceUrl="${restaurant.getReferenceUrl() ?? ''}"
        ${restaurant.getIsFavorite() ? 'favorite' : ''}
      ></r-restaurant-detail-modal>
  `;

    const $main = document.querySelector<HTMLElement>('main');

    if (!$main) return errorHandler.doesNotExistElement();

    $main.insertAdjacentHTML('beforeend', $restaurantDetailModal);
  },

  close: () => {
    const $restaurantDetailtModal = document.querySelector<CustomRestaurantDetailModalElement>(
      'r-restaurant-detail-modal',
    );

    if (!$restaurantDetailtModal) return errorHandler.doesNotExistElement();

    $restaurantDetailtModal.remove();
  },
};

export default restaurantDetailModal;
