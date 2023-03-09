import { CLASS, ID } from '../../constants';
import RestaurantListItem from '../../domain/RestaurantListItem';
import FilterSection from '../FilterSection';
import RestaurantList from '../RestaurantList';

const Menu = {
  template() {
    return `
      <section class="menu-container">
        <div id="${ID.ALL_RESTAURANT}" class="${CLASS.MENU_ITEM} ${CLASS.MENU_ITEM_CLICKED}">모든 음식점</div>
        <div id="${ID.FAVORITE_RESTAURANT}" class="menu-item">자주 가는 음식점</div>
      </section>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    this.handleAllRestaurant(RestaurantListItem);
    this.handleFavoriteRestaurant(RestaurantListItem);
  },
  handleAllRestaurant(RestaurantListItem: RestaurantListItem) {
    const allRestaurant = document.querySelector(`#${ID.ALL_RESTAURANT}`) as HTMLDivElement;

    allRestaurant?.addEventListener('click', () => {
      FilterSection.show();
      this.addClassBy(allRestaurant);

      RestaurantList.update(RestaurantListItem, RestaurantListItem.filterAndSort());
    });
  },
  handleFavoriteRestaurant(RestaurantListItem: RestaurantListItem) {
    const favoriteRestaurant = document.querySelector(`#${ID.FAVORITE_RESTAURANT}`) as HTMLDivElement;

    favoriteRestaurant?.addEventListener('click', () => {
      FilterSection.hide();
      this.addClassBy(favoriteRestaurant);

      RestaurantList.update(RestaurantListItem, RestaurantListItem.getFavoriteListItem());
    });
  },
  addClassBy(clickedElement: HTMLElement) {
    const menuItems = document.querySelectorAll(`.${CLASS.MENU_ITEM}`);

    menuItems?.forEach((item) => {
      if (item === clickedElement) {
        item.classList.add(CLASS.MENU_ITEM_CLICKED);
      } else {
        item.classList.remove(CLASS.MENU_ITEM_CLICKED);
      }
    });
  },
};

export default Menu;
