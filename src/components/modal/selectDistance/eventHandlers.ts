import restaurantStateStore from '../../../store/RestaurantStateStore';
import { Distance } from '../../../types';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';

const selectDistanceEventHandler = (select: HTMLElement) => {
  select.addEventListener('change', (event) => {
    if (event.target instanceof HTMLSelectElement) {
      const selectedValue = Number(event.target.value) as Distance;
      removeHTMLElementByClassName('invalid_distance');
      restaurantStateStore.setDistance(selectedValue);
    }
  });
};

const distanceChange = () => {
  const select = document.getElementById('distance');

  if (select) {
    selectDistanceEventHandler(select);
  }
};

export default distanceChange;
