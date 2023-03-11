import actions from '../../../hooks/actions';
import { Restaurant } from '../../../type/common';
import getFormData from '../../../utils/getFormData';
import { $ } from '../../../utils/querySelector';
import RestaurantList from '../RestaurantList';
import Button from './abstract/Button';

class AddRestaurantModalButton extends Button {
  constructor($target: Element) {
    super($target);
  }

  addRestaurantEvent() {
    const dom = $('form');

    if (!(dom instanceof HTMLFormElement)) return;

    const restaurant = getFormData(dom);

    if (!restaurant) return;

    actions.addRestaurant(restaurant as Restaurant);
    new RestaurantList($('.restaurant-list-wrapper')).render();
  }

  addEvent(eventTarget: Element) {
    if (eventTarget.classList.contains('add')) {
      this.addRestaurantEvent();
    }

    this.closeModal(eventTarget);
    return this;
  }
}

export default AddRestaurantModalButton;
