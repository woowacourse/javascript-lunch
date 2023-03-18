import { $ } from '../utils/Dom';
import ModalRestaurantDetail from './ModalRestaurantDetail';
import { stringifyJson, getRestaurantListFromLocalstorage, setToLocalStorage } from '../utils/LocalStorage';
import { LOCALSTORAGE_KEY, LOCAL_INPUT, FAVORITE_ICON, PICTURE_PATH } from '../utils/Constant';
export default class RestaurantRegistry {
  appendRestaurant(restaurantInfo) {
    const category = {
      한식: PICTURE_PATH.KOREAN,
      일식: PICTURE_PATH.JAPANESE,
      양식: PICTURE_PATH.AMERICAN,
      중식: PICTURE_PATH.CHINESE,
      아시안: PICTURE_PATH.ASIAN,
      기타: PICTURE_PATH.ETC,
    };
    const template = `
    <li class="restaurant" id="restaurant${restaurantInfo.id}">
        <div class="restaurant_info">
          <div class="restaurant__category">
            <img src="${category[restaurantInfo.category]}" alt="${restaurantInfo.category}" class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurantInfo.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스로부터 ${restaurantInfo.distance}분 내</span>
            <p class="restaurant__description text-body">${restaurantInfo.description}</p>
          </div>
        </div>  
          <div class="restaurant_favorite${restaurantInfo.id}">
            <img src=${restaurantInfo.favorite}>
          </div>
    </li>
    `;

    $('.restaurant-list').insertAdjacentHTML('beforeend', template);

    $(`#restaurant${restaurantInfo.id}`).addEventListener('click', () => {
      const modalRestaurantDetail = new ModalRestaurantDetail();
      modalRestaurantDetail.changeRestaurantInformation(restaurantInfo);
    });

    $(`.restaurant_favorite${restaurantInfo.id}`).addEventListener('click', e => {
      this.clickModalFavorite(e, restaurantInfo);
    });
  }

  clickModalFavorite(e, restaurantInfo) {
    e.stopPropagation();

    if (this.isFilledOrLined(e, FAVORITE_ICON.ENROLL)) {
      this.ifFavoriteFilled(e, restaurantInfo);
      return;
    }

    if (this.isFilledOrLined(e, FAVORITE_ICON.UNENROLL)) {
      this.ifFavoriteLined(e, restaurantInfo);
      return;
    }
  }

  isFilledOrLined(e, favorite) {
    return e.target.getAttribute('src') === favorite;
  }

  getFavoriteList(favorite_icon, restaurantInfo) {
    const restaurantCopy = [...getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.RESTAURANT)];
    return restaurantCopy.map(restaurant => {
      if (restaurant.id === restaurantInfo.id) restaurant[LOCAL_INPUT.FAVORITE] = favorite_icon;
      return restaurant;
    });
  }

  ifFavoriteFilled(e, restaurantInfo) {
    const restaurantFavoriteList = this.getFavoriteList(FAVORITE_ICON.UNENROLL, restaurantInfo);
    setToLocalStorage(LOCALSTORAGE_KEY.RESTAURANT, restaurantFavoriteList);

    const res = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.FAVORITE) ?? [];
    const deletedRestaurantElementArray = res.filter(val => val.id !== restaurantInfo.id);
    setToLocalStorage(LOCALSTORAGE_KEY.FAVORITE, deletedRestaurantElementArray);

    this.changeFavoriteImageAttribut(e, restaurantInfo, FAVORITE_ICON.UNENROLL);
  }

  ifFavoriteLined(e, restaurantInfo) {
    const restaurantFavoriteList = this.getFavoriteList(FAVORITE_ICON.ENROLL, restaurantInfo);
    setToLocalStorage(LOCALSTORAGE_KEY.RESTAURANT, restaurantFavoriteList);

    const favoriteList = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.FAVORITE) ?? [];
    const favorite = [...favoriteList];
    favorite.push(restaurantInfo);
    setToLocalStorage(LOCALSTORAGE_KEY.FAVORITE, favorite);

    this.changeFavoriteImageAttribut(e, restaurantInfo, FAVORITE_ICON.ENROLL);
  }

  changeFavoriteImageAttribut(e, restaurantInfo, favorite) {
    $(`.restaurant_favorite${restaurantInfo.id}`).children[0].setAttribute('src', favorite);
    e.target.setAttribute('src', favorite);
  }

  attachRestaurantToRegistry(restaurantParsedInfo) {
    restaurantParsedInfo.forEach(value => {
      this.appendRestaurant(value);
    });
  }
}
