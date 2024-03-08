import Restaurant from '../domain/Restaurant';
import RestaurantComponent from '../components/Restaurant';

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
    const $restaurantForm = document.querySelector('form');
    const category = $restaurantForm.elements.category.value;
    const name = $restaurantForm.elements.name.value;
    const distance = Number($restaurantForm.elements.distance.value);
    const description = $restaurantForm.elements.description.value;
    const link = $restaurantForm.elements.link.value;
    const restaurantInformation = new Restaurant({ category, name, distance, description, link });

    this.restaurantList.add(restaurantInformation);
    this.handleCategoryFilter();
    this.close();
  }

  handleCategoryFilter() {
    console.log('handleCategoryFilter:', this.restaurantList);
    const $categoryFilter = document.getElementById('category-filter');
    const $sortingFilter = document.getElementById('sorting-filter');
    const $restaurantList = document.querySelector('.restaurant-list');

    const categoryOptions = $categoryFilter.options;
    const category = categoryOptions[categoryOptions.selectedIndex].text;
    const sortingOptions = $sortingFilter.options;
    const sortingCondition = sortingOptions[sortingOptions.selectedIndex].text;

    this.restaurantList.filterByCategory(category);
    const sortedList = this.restaurantList.getSortedByCondition(sortingCondition);
    $restaurantList.replaceChildren();
    sortedList.forEach(element => {
      $restaurantList.innerHTML += RestaurantComponent(element.information);
    });
  }
}

export default ModalEventHandler;
