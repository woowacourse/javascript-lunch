import { FAVORITE } from '../constants/config';
import Restaurant from '../domain/Restaurant';
import Modal from './Modal';
import RestaurantFilterContainer from './RestaurantFilterContainer';

class AddRestaurantModal extends Modal {
  #restaurantList;
  #addRestaurant;

  constructor(addRestaurant, restaurantList) {
    super(addRestaurant.container);
    this.#addRestaurant = addRestaurant;
    this.#restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    const $restaurantForm = this.#addRestaurant.form;
    this.#addRestaurant.closeButton.addEventListener('click', () => this.close());
    $restaurantForm.addEventListener('submit', e => this.handleAddRestaurant(e));
  }

  close() {
    const $modalContainer = document.getElementById('modal-container');
    $modalContainer.replaceChildren();
    this.#addRestaurant.form.reset();
    super.toggle();
  }

  handleAddRestaurant(e) {
    e.preventDefault();
    const $restaurantForm = e.target;
    const category = $restaurantForm.elements.category.value;
    const name = $restaurantForm.elements.name.value;
    const distance = Number($restaurantForm.elements.distance.value);
    const description = $restaurantForm.elements.description.value;
    const link = $restaurantForm.elements.link.value;
    const favorite = FAVORITE.no;
    const restaurantInformation = new Restaurant({ category, name, distance, favorite, description, link });

    this.#restaurantList.add(restaurantInformation);

    new RestaurantFilterContainer(this.#restaurantList).handleFilter();

    this.close();
  }
}

export default AddRestaurantModal;
