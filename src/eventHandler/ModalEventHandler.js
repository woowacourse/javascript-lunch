import Restaurant from '../domain/Restaurant';
import HomeEventHandler from './HomeEventHandler';

class ModalEventHandler {
  restaurantList;

  constructor(restaurantList) {
    this.restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    const $restaurantForm = document.querySelector('form');
    document.querySelector('#button-close').addEventListener('click', this.close);
    $restaurantForm.addEventListener('submit', e => this.handleAddRestaurant(e));
  }

  close() {
    document.querySelector('.modal').classList.remove('modal--open');
    document.querySelector('form').reset();
  }

  handleAddRestaurant(e) {
    e.preventDefault();
    const $restaurantForm = e.target;
    const category = $restaurantForm.elements.category.value;
    const name = $restaurantForm.elements.name.value;
    const distance = Number($restaurantForm.elements.distance.value);
    const description = $restaurantForm.elements.description.value;
    const link = $restaurantForm.elements.link.value;
    const favorite = false;
    const restaurantInformation = new Restaurant({ category, name, distance, description, link, favorite });

    this.restaurantList.add(restaurantInformation);
    new HomeEventHandler(this.restaurantList).handleFilter();
    this.close();
  }
}

export default ModalEventHandler;
