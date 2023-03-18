import { $ } from '../utils/Dom';
import { getRestaurantListFromLocalstorage, getValueFromLocalStorage, setToLocalStorage } from '../utils/LocalStorage';
import { LOCALSTORAGE_KEY, LOCAL_INPUT, FAVORITE_ICON, PICTURE_PATH, FORM_VALUE } from '../utils/Constant';

export default class ModalRestaurantDetail {
  #template = `
    <div class="modal--detail">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-picture-favorite">
          <!-- 카테고리 사진 -->
          <div class="detail-item restaurant__category">
            <img class="category-icon modal-detail-restaurant__image">
          </div>

          <!-- 즐겨찾기 -->
          <div class="modla--restaurant_favorite">
          </div>
        </div>

          <!-- 음식점 이름 -->
          <div class="detail-item">
            <h3 class="restaurant__name  modal-detail-restaurant__name text-subtitle"></h3>
          </div>

          <!-- 거리 -->
          <div class="detail-item">
            <span class="restaurant__distance modal-detail-restaurant__distance text-body"></span>
          </div>

          <!-- 설명 -->
          <div class="detail-item">
            <p class="modal-detail-restaurant__description text-body"></p>
          </div>

          <!-- 링크 -->
          <div class="detail-item">
            <a class="modal-detail-restaurant__link"></a>
          </div>

          <!-- 취소/추가 버튼 -->
          <div class="button-container detail-button-container">
            <button type="button" class="button button--delete text-caption">삭제하기</button>
            <button type="button" class="button button--close text-caption">닫기</button>
          </div>
      </div>
    </div>
    `;

  constructor(restaurantList, restaurantRegistry) {
    this.restaurantList = restaurantList;
    this.restaurantRegistry = restaurantRegistry;
  }
  render() {
    document.body.insertAdjacentHTML('beforeend', this.#template);
  }

  initializeButtonEvents() {
    $('.button--close').addEventListener('click', this.closeModalDetail);
    $('.button--delete').addEventListener('click', this.deleteButtonInDetail);
  }

  deleteButtonInDetail = () => {
    this.restaurantList.deleteRestaurantElement();

    if ($('.favorite-restaurant').classList.contains('active')) {
      const restaurantAll = getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.FAVORITE) || [];
      this.closeModalDetail();

      $('.restaurant-list').replaceChildren();
      this.restaurantRegistry.attachRestaurantToRegistry(restaurantAll);
      return;
    }

    this.restauranListFilter();
    this.closeModalDetail();
  };

  restauranListFilter() {
    const foodCategory = getValueFromLocalStorage(LOCALSTORAGE_KEY.FOODCATEGORY, LOCAL_INPUT.ALL_CATEGORY);
    const sortBy = getValueFromLocalStorage(LOCALSTORAGE_KEY.SORTBY, FORM_VALUE.NAME);

    this.restaurantList.filterCategory(foodCategory);
    this.restaurantList.filterBySort(sortBy, foodCategory);
  }

  changeRestaurantInformation(restaurantInfo) {
    this.restaurantInfo = restaurantInfo;

    this.setRestaurantInformation(restaurantInfo);

    $(`.modla--restaurant_image`).addEventListener('click', this.favoriteEvent);
  }

  favoriteEvent = e => this.clickModalFavorite(e, this.restaurantInfo);

  setRestaurantInformation(restaurantInfo) {
    this.setRestaurantId(restaurantInfo);
    this.setRestaurantCategory(restaurantInfo);
    this.setRestaurantName(restaurantInfo);
    this.setRestaurantDistance(restaurantInfo);
    this.setRestaurantDescription(restaurantInfo);
    this.setRestaurantLink(restaurantInfo);
    this.setRestaurantFavorite(restaurantInfo);
  }

  setRestaurantId(restaurantInfo) {
    $('.modal--detail').id = restaurantInfo.id;
  }

  setRestaurantCategory(restaurantInfo) {
    const category = {
      한식: PICTURE_PATH.KOREAN,
      일식: PICTURE_PATH.JAPANESE,
      양식: PICTURE_PATH.AMERICAN,
      중식: PICTURE_PATH.CHINESE,
      아시안: PICTURE_PATH.ASIAN,
      기타: PICTURE_PATH.ETC,
    };

    $('.modal-detail-restaurant__image').setAttribute('src', category[restaurantInfo.category]);
    $('.modal-detail-restaurant__image').setAttribute('alt', restaurantInfo.category);
  }

  setRestaurantName(restaurantInfo) {
    $('.modal-detail-restaurant__name').textContent = restaurantInfo.name;
  }

  setRestaurantDistance(restaurantInfo) {
    $('.modal-detail-restaurant__distance').textContent = `캠퍼스로부터 ${restaurantInfo.distance}분 내`;
  }

  setRestaurantDescription(restaurantInfo) {
    $('.modal-detail-restaurant__description').textContent = restaurantInfo.description;
  }

  setRestaurantLink(restaurantInfo) {
    $('.modal-detail-restaurant__link').setAttribute('href', restaurantInfo.link);
    $('.modal-detail-restaurant__link').textContent = restaurantInfo.link;
  }

  setRestaurantFavorite(restaurantInfo) {
    this.changeFavoriteImg(FAVORITE_ICON.UNENROLL);
    this.openModalDetail();

    (getRestaurantListFromLocalstorage(LOCALSTORAGE_KEY.FAVORITE) ?? []).forEach(val => {
      if (val.id === restaurantInfo.id) {
        this.changeFavoriteImg(FAVORITE_ICON.ENROLL);
      }
    });
  }

  changeFavoriteImg(favorite) {
    $(`.modla--restaurant_favorite`).replaceChildren();
    $(`.modla--restaurant_favorite`).innerHTML += `<img class="modla--restaurant_image" src="${favorite}">`;
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

  openModalDetail() {
    $('.modal--detail').style.display = 'block';
  }

  closeModalDetail = () => {
    $('.modal--detail').style.display = 'none';
    $('.modal--detail').removeAttribute('id');
  };
}
