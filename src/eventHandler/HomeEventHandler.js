import RestaurantComponent from '../components/Restaurant';

class HomeEventHandler {
  restaurantList;

  constructor(restaurantList) {
    this.restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    document.querySelector('.gnb__button').addEventListener('click', this.handleOpenModal);
  }

  handleOpenModal() {
    document.querySelector('.modal').classList.add('modal--open');
  }

  handleFilter() {
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
    RestaurantComponent.render(sortedList);
  }
}

export default HomeEventHandler;
