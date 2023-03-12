import { CustomRestaurantDetailModalElement } from '../components';
import { RestaurantProps } from '../domain/Restaurant';

const restaurantDetailModal = {
  open: ({ category, name, distanceByMinutes, description, referenceUrl }: RestaurantProps) => {
    const $restaurantDetailModal = `
      <r-restaurant-detail-modal
        category="${category}"
        name="${name}"
        distanceByMinutes="${distanceByMinutes}"
        description="${description ?? ''}"
        referenceUrl="${referenceUrl ?? ''}"
      ></r-restaurant-detail-modal>
  `;

    const $main = document.querySelector<HTMLElement>('main');

    if (!$main) return;

    $main.insertAdjacentHTML('beforeend', $restaurantDetailModal);
  },

  close: () => {
    const $restaurantDetailtModal = document.querySelector<CustomRestaurantDetailModalElement>(
      'r-restaurant-detail-modal',
    );

    if (!$restaurantDetailtModal) return;

    $restaurantDetailtModal.remove();
  },
};

export default restaurantDetailModal;