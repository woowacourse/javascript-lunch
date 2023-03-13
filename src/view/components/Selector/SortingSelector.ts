import actions from '../../../hooks/actions';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Selector from './abstract/Selector';

class SortingSelector extends Selector {
  constructor($target: Element) {
    super($target);
  }

  addEvent(eventTarget: HTMLSelectElement) {
    if (this.style?.name === 'sorting' && eventTarget.value === 'name') {
      actions.sortRestaurantsName();
    }

    if (this.style?.name === 'sorting' && eventTarget.value === 'distance') {
      actions.sortRestaurantsDistance();
    }

    new RestaurantList($('.restaurant-list-wrapper')).render();

    return this;
  }
}

export default SortingSelector;
