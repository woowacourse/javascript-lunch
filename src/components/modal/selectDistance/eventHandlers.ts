import restaurantStateStore from '../../../store/RestaurantStateStore';
import { Distance } from '../../../types';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';

export const selectDistanceEventHandler = (select: HTMLElement) => {
  select.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = Number(event.target.value) as Distance;
      removeHTMLElementByClassName('invalid_distance');
      restaurantStateStore.setDistance(selectedValue);
    }
  });
};

export const distanceChange = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.getElementById('distance');

    if (select) {
      selectDistanceEventHandler(select);
    }
  });
};
