import actions from '../../../hooks/actions';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Selector from './abstract/Selector';

class CategorySelector extends Selector {
  constructor($target: Element) {
    super($target);
  }

  addEvent(eventTarget: HTMLSelectElement) {
    if (this.style?.name === 'category') {
      actions.filterRestaurantsCategory(eventTarget.value);
    }

    new RestaurantList($('.restaurant-list-wrapper')).render();

    return this;
  }
}

export default CategorySelector;
