import actions from '../../../hooks/actions';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Button from './abstract/Button';

class RemoveRestaurantModalButton extends Button {
  constructor($target: Element) {
    super($target);
  }

  removeRestaurantEvent(id: number) {
    actions.removeRestaurant(id);
    new RestaurantList($('.restaurant-list-wrapper')).render();
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.classList.contains('remove')) {
      this.removeRestaurantEvent(Number(eventTarget.parentElement?.id));
    }

    this.closeModal();

    return this;
  }
}

export default RemoveRestaurantModalButton;
