import actions from '../../../hooks/actions';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Tab from './abstract/Tab';

class FavoriteTab extends Tab {
  constructor($target: Element) {
    super($target);
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.closest('.tab--favorite-restaurant')) {
      actions.filterFavoriteRestaurnats();

      new RestaurantList($('.restaurant-list-wrapper')).render();
    }

    return this;
  }
}

export default FavoriteTab;
