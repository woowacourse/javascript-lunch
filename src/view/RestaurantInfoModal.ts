import { $, $$ } from '../util/querySelector';
import { Restaurant } from '../type';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';
import dummyRestaurants from '../../__tests__/dummyRestaurants';

type RestaurantInfoModalType = {
  parentElement: HTMLElement;
};

class RestaurantInfoModal {
  #parentElement;
  // #parentEvent;
  #modal;

  constructor({ parentElement }: RestaurantInfoModalType) {
    this.#parentElement = parentElement;

    this.#modal = new Modal({
      parentElement: this.#parentElement,
      info: {
        id: 'restaurant-info-modal',
        innerId: 'restaurant-info-modal-contents',
      },
    });
  }

  toggleModal() {
    this.#modal.toggleModal();
  }

  updateRestaurantInfo(restaurant: Restaurant) {
    $('#restaurant-info-modal-contents').innerHTML = '';

    new RestaurantItem({
      parentElement: $('#restaurant-info-modal-contents'),
      restaurant: restaurant,
    });
  }

  openInfoModal(restaurant: Restaurant) {
    this.updateRestaurantInfo(restaurant);
    this.toggleModal();
  }
}

export default RestaurantInfoModal;
