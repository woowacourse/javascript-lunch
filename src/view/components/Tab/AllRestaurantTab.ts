import actions from '../../../hooks/actions';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Tab from './abstract/Tab';

class AllRestaurantTab extends Tab {
  constructor($target: Element) {
    super($target);
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.closest('.tab--all-restaurant')) {
      actions.filterRestaurantsCategory('전체');
      this.tabEvent();

      eventTarget.classList.add('tab--open');
      new RestaurantList($('.restaurant-list-wrapper')).render();
    }

    return this;
  }
}

export default AllRestaurantTab;
