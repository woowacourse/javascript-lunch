import Modal from './Modal';
import RestaurantFilterContainer from './RestaurantFilterContainer';

class RestaurantDetailModal extends Modal {
  #restaurantDetail;
  #restaurantList;

  constructor(restaurantDetail, restaurantList) {
    super(restaurantDetail.container);
    this.#restaurantDetail = restaurantDetail;
    this.#restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    this.#restaurantDetail.removeButton.addEventListener('click', () => this.handleRemoveRestaurant());
    this.#restaurantDetail.closeButton.addEventListener('click', () => this.close());
  }

  close() {
    const $modalContainer = document.getElementById('modal-container');

    $modalContainer.replaceChildren();
    new RestaurantFilterContainer(this.#restaurantList).handleFilter();

    super.toggle();
  }

  handleRemoveRestaurant() {
    this.#restaurantList.remove(this.#restaurantDetail.restaurant);

    this.close();
  }
}

export default RestaurantDetailModal;
