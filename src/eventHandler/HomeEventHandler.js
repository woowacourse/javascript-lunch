import RestaurantComponent from '../components/Restaurant';
import { FAVORITE } from '../constants/config';
import { FAVORITE_IMG_SRC, FILTER_CONDITION } from '../constants/filter';

class HomeEventHandler {
  restaurantList;

  constructor(restaurantList) {
    this.restaurantList = restaurantList;
    this.setEvent();
  }

  setEvent() {
    document.querySelector('.gnb__button').addEventListener('click', this.handleOpenModal);
    const $favoriteIconNodeList = document.querySelectorAll('.favorite-icon');
    $favoriteIconNodeList.forEach((favoriteIconNode, index) => {
      console.log(favoriteIconNode);
      favoriteIconNode.addEventListener('click', e => this.handleFavorite(e, index));
    });
  }

  handleOpenModal() {
    document.querySelector('.modal').classList.add('modal--open');
  }

  handleFilter() {
    const $restaurantList = document.querySelector('.restaurant-list');
    const filterCondition = this.getFilterCondition();

    this.restaurantList.filterByCategory(filterCondition[FILTER_CONDITION.category]);
    const sortedList = this.restaurantList.getSortedByCondition(filterCondition[FILTER_CONDITION.sortingCondition]);

    $restaurantList.replaceChildren();
    RestaurantComponent.render(sortedList);
  }

  getFilterCondition() {
    const $categoryFilter = document.getElementById('category-filter');
    const $sortingFilter = document.getElementById('sorting-filter');

    const categoryOptions = $categoryFilter.options;
    const category = categoryOptions[categoryOptions.selectedIndex].text;
    const sortingOptions = $sortingFilter.options;
    const sortingCondition = sortingOptions[sortingOptions.selectedIndex].text;

    return [category, sortingCondition];
  }

  handleFavorite(e, index) {
    const target = this.restaurantList.restaurants[index].information;
    if (target.favorite === FAVORITE.yes) {
      target.favorite = FAVORITE.no;
    } else {
      target.favorite = FAVORITE.yes;
    }
    e.target.src = FAVORITE_IMG_SRC[target.favorite];
    this.restaurantList.setStorageRestaurantList(this.restaurantList.restaurants);
  }
}
export default HomeEventHandler;
