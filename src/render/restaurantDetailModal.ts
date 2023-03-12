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
};

export default restaurantDetailModal;