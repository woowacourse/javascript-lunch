import { RestaurantState } from '../../types/index.d';
import { changeFavoriteState } from '../restaurantListItem/favoriteStateChangeHandler';
import RestaurantListStorageService from '../../services/restaurantListStorageService';
import { createIsFavoriteImageComponent } from '../../services/createComponent';

const updateFavoriteIconUI = (newHtml: HTMLElement) => {
  const favoritedIcon = document.querySelector('.favorited-icon');
  if (favoritedIcon && favoritedIcon.parentNode) {
    favoritedIcon.parentNode.replaceChild(newHtml, favoritedIcon);
  }
};

const toggleIconImageComponent = (targetRestaurant: RestaurantState) => {
  return createIsFavoriteImageComponent(targetRestaurant.isFavorited);
};

const reRenderFavoriteIconComponent = (targetRestaurantListItem: RestaurantState) => {
  const allRestaurants = RestaurantListStorageService.getData();
  const targetRestaurant = allRestaurants?.filter((restaurant) => restaurant.id === targetRestaurantListItem.id);
  if (targetRestaurant && targetRestaurant.length > 0) {
    const favoritedIconComponent = toggleIconImageComponent(targetRestaurant[0]);
    updateFavoriteIconUI(favoritedIconComponent);
  }
};

const favoriteIconChangeHandler = (event: Event, targetRestaurantListItem: RestaurantState) => {
  const target = event.target as Element;
  if (target.classList.contains('favorited-icon')) {
    changeFavoriteState(targetRestaurantListItem.id);
    reRenderFavoriteIconComponent(targetRestaurantListItem);
  }
};

const ListItemDetailModalChangeState = (targetRestaurantListItem: RestaurantState) => {
  const favoritedIconContainer = document.querySelector('.favorited-icon-container') as HTMLElement;

  favoritedIconContainer.addEventListener('click', (event) =>
    favoriteIconChangeHandler(event, targetRestaurantListItem),
  );
};

export default ListItemDetailModalChangeState;
