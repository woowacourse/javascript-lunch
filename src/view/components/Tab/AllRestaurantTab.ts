import actions from '../../../hooks/actions';
import { $, $$ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Tab from './abstract/Tab';

class AllRestaurantTab extends Tab {
  constructor($target: Element) {
    super($target);
  }

  displaySelectors() {
    $$('.restaurant-filter').forEach((selectorDom) => {
      selectorDom.style.display = 'block';
    });
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.closest('.tab--all-restaurant')) {
      actions.filterRestaurantsCategory('전체');
      this.tabEvent(eventTarget);

      new RestaurantList($('.restaurant-list-wrapper')).render();
      this.displaySelectors();
    }

    return this;
  }
}

export default AllRestaurantTab;
