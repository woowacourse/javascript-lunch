import actions from '../../../hooks/actions';
import { $, $$ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Tab from './abstract/Tab';

class FavoriteTab extends Tab {
  constructor($target: Element) {
    super($target);
  }

  notDisplaySelectors() {
    $$('.restaurant-filter').forEach((selectorDom) => {
      selectorDom.style.display = 'none';
    });
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.closest('.tab--favorite-restaurant')) {
      actions.filterFavoriteRestaurnats();
      this.tabEvent(eventTarget);

      new RestaurantList($('.restaurant-list-wrapper')).render();
      this.notDisplaySelectors();
    }

    return this;
  }
}

export default FavoriteTab;
