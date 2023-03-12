import render from '.';
import { CustomRestaurantItem, CustomRestaurantListElement } from '../components';
import Restaurant from '../domain/Restaurant';
import { ALERT_MESSAGE } from '../utils/constants';
import errorHandler from '../utils/errorHandler';

export default {
  render: (restaurants: Restaurant[]) => {
    const $restaurantList = document.querySelector<CustomRestaurantListElement>('#restaurant-list');

    if (!$restaurantList) return errorHandler.doesNotExistElement();

    $restaurantList.setRestaurants(restaurants);
  },

  toggleRestaurantFavorite: (restaurantListType: 'all' | 'favorite', restaurant: Restaurant) => {
    const $targetRestaurant = document.querySelector<CustomRestaurantItem>(
      `r-restaurant[name="${restaurant.getName()}"]`,
    );
    const $modal = document.querySelector('.modal-container');
    const isFavorite = restaurant.getIsFavorite();

    if (isFavorite) render.message('success', $modal ? 'top' : 'bottom', ALERT_MESSAGE.addFavorite);
    else render.message('success', $modal ? 'top' : 'bottom', ALERT_MESSAGE.removeFavorite);

    if (restaurantListType === 'all') reRenderAllRestaurntList($targetRestaurant);
    else reRenderFavoriteRestaurntList($targetRestaurant, restaurant);
  },
};

const reRenderAllRestaurntList = ($targetRestaurant: CustomRestaurantItem | null) => {
  if (!$targetRestaurant) return errorHandler.doesNotExistElement();

  if ($targetRestaurant.hasAttribute('favorite')) $targetRestaurant.removeAttribute('favorite');
  else $targetRestaurant.setAttribute('favorite', '');
};

const reRenderFavoriteRestaurntList = (
  $targetRestaurant: CustomRestaurantItem | null,
  restaurant: Restaurant,
) => {
  if (!$targetRestaurant) insertNewRestaurntList(restaurant);
  else $targetRestaurant.remove();
};

const insertNewRestaurntList = (targetRestaurant: Restaurant) => {
  const $restaurantList =
    document.querySelector<CustomRestaurantListElement>('#restaurant-list ul');

  if (!$restaurantList) return errorHandler.doesNotExistElement();

  $restaurantList.insertAdjacentHTML(
    'afterbegin',
    `<r-restaurant
        data-testid="${targetRestaurant.getName()}"
        name="${targetRestaurant.getName()}"
        distanceByMinutes="${targetRestaurant.getDistanceByMinutes()}"
        description="${targetRestaurant.getDescription() ?? ''}"
        category="${targetRestaurant.getCategory() ?? ''}"
        favorite
      ></r-restaurant>`,
  );
};
