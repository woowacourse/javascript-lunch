import { $ } from '../util/querySelector';
import { Restaurant } from '../type';
import Modal from './components/Modal';
import RestaurantItem from './components/RestaurantItem';

type RestaurantInfoModalType = {
  parentElement: HTMLElement;
  parentEvent: {
    onFavoriteButtonClicked: (itemId: number) => void;
  };
};

class RestaurantInfoModal {
  #parentElement;
  #parentEvent;
  #modal;

  constructor({ parentElement, parentEvent }: RestaurantInfoModalType) {
    this.#parentElement = parentElement;
    this.#parentEvent = parentEvent;

    this.#modal = new Modal({
      parentElement: this.#parentElement,
      info: {
        id: 'restaurant-info-modal',
        innerId: 'restaurant-info-modal-contents',
      },
    });
  }

  closeOrOpenModal(command: string) {
    this.#modal.closeOrOpenModal(command);
  }

  updateRestaurantInfo(restaurant: Restaurant) {
    $('#restaurant-info-modal-contents').innerHTML = '';

    new RestaurantItem({
      parentElement: $('#restaurant-info-modal-contents'),
      restaurant: restaurant,
      parentEvent: {
        onFavoriteButtonClicked: (itemId: number) =>
          this.#parentEvent.onFavoriteButtonClicked(itemId),
      },
    });
  }

  openInfoModal(restaurant: Restaurant) {
    this.updateRestaurantInfo(restaurant);
    this.closeOrOpenModal('open');
  }
}

export default RestaurantInfoModal;
