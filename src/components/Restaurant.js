import { CATEGORY_IMG_SRC, FAVORITE_IMG_SRC } from '../constants/filter';

const RestaurantComponent = {
  render(restaurantList) {
    const $restaurantList = document.querySelector('.restaurant-list');
    restaurantList.forEach(element => {
      $restaurantList.appendChild(this.mounted(element.information));
    });
  },

  mounted(information) {
    const $restaurant = document.createElement('li');
    const $restaurantCategory = this.createRestaurantCategory(information);
    const $restaurantInfo = this.createRestaurantInfo(information);

    $restaurant.classList.add('restaurant');

    $restaurant.appendChild($restaurantCategory);
    $restaurant.appendChild($restaurantInfo);

    return $restaurant;
  },

  createRestaurantCategory(information) {
    const $restaurantCategory = document.createElement('div');
    const $categoryIcon = this.createCategoryIcon(information);

    $restaurantCategory.classList.add('restaurant__category');

    $restaurantCategory.appendChild($categoryIcon);

    return $restaurantCategory;
  },

  createCategoryIcon(information) {
    const $categoryIcon = document.createElement('img');

    $categoryIcon.setAttribute('src', `${CATEGORY_IMG_SRC[information.category]}`);
    $categoryIcon.setAttribute('alt', `${information.category}`);
    $categoryIcon.classList.add('category-icon');

    return $categoryIcon;
  },

  createRestaurantInfo(information) {
    const $restaurantInfo = document.createElement('div');
    const $restaurantRequiredInfo = this.createRestaurantRequiredInfo(information);
    const $restaurantDescription = this.createRestaurantDescription(information);

    $restaurantInfo.classList.add('restaurant__info');

    $restaurantInfo.appendChild($restaurantRequiredInfo);
    $restaurantInfo.appendChild($restaurantDescription);

    return $restaurantInfo;
  },

  createRestaurantRequiredInfo(information) {
    const $restaurantRequiredInfo = document.createElement('div');
    const $restaurantTitleContainer = this.createRestaurantTitleContainer(information);
    const $favoriteContainer = this.createFavoriteContainer(information);

    $restaurantRequiredInfo.classList.add('restaurant__required-info');

    $restaurantRequiredInfo.appendChild($restaurantTitleContainer);
    $restaurantRequiredInfo.appendChild($favoriteContainer);

    return $restaurantRequiredInfo;
  },

  createRestaurantTitleContainer(information) {
    const $restaurantTitleContainer = document.createElement('div');
    const $restaurantName = this.createRestaurantName(information);
    const $restaurantDistance = this.createRestaurantDistance(information);

    $restaurantTitleContainer.appendChild($restaurantName);
    $restaurantTitleContainer.appendChild($restaurantDistance);

    return $restaurantTitleContainer;
  },

  createRestaurantName(information) {
    const $restaurantName = document.createElement('h3');

    $restaurantName.classList.add('restaurant__name', 'text-subtitle');
    $restaurantName.textContent = `${information.name}`;

    return $restaurantName;
  },

  createRestaurantDistance(information) {
    const $restaurantDistance = document.createElement('span');

    $restaurantDistance.classList.add('restaurant__distance', 'text-body');
    $restaurantDistance.textContent = `캠퍼스부터 ${information.distance}분 내`;

    return $restaurantDistance;
  },

  createFavoriteContainer(information) {
    const $favoriteContainer = document.createElement('div');
    const $favoriteIcon = this.createFavoriteIcon(information);

    $favoriteContainer.appendChild($favoriteIcon);

    return $favoriteContainer;
  },

  createFavoriteIcon(information) {
    const $favoriteIcon = document.createElement('img');

    $favoriteIcon.setAttribute('src', `${FAVORITE_IMG_SRC[information.favorite]}`);
    $favoriteIcon.setAttribute('alt', `${information.favorite}`);
    $favoriteIcon.classList.add('favorite-icon');

    return $favoriteIcon;
  },

  createRestaurantDescription(information) {
    const $restaurantDescription = document.createElement('p');

    $restaurantDescription.classList.add('restaurant__description', 'text-body');
    $restaurantDescription.textContent = `${information.description}`;

    return $restaurantDescription;
  },
};

export default RestaurantComponent;
