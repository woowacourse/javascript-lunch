import './index.css';
import categoryKorean from '../../assets/category-korean.png';
import categoryChinese from '../../assets/category-chinese.png';
import categoryJapanese from '../../assets/category-japanese.png';
import categoryWestern from '../../assets/category-western.png';
import categoryAsian from '../../assets/category-asian.png';
import categoryEtc from '../../assets/category-etc.png';
import favoriteIcon from '../../assets/favorite-icon-filled.png';
import notFavoriteIcon from '../../assets/favorite-icon-lined.png';
import { restaurant } from '../../domain/restaurant';
import RestaurantDetails from '../ModalContents/RestaurantDetails';
import { $ } from '../../utils';

const CATEGORY_IMAGES = {
  한식: categoryKorean,
  중식: categoryChinese,
  일식: categoryJapanese,
  양식: categoryWestern,
  아시안: categoryAsian,
  기타: categoryEtc,
};

const FAVORITE_IMAGES = {
  true: favoriteIcon,
  false: notFavoriteIcon,
};

class RestaurantInfo extends HTMLElement {
  connectedCallback() {
    this.render();
    this.getId();
    this.handleFavorite();
  }

  render() {
    const id = this.getAttribute('id');
    const name = this.getAttribute('name');
    const category = this.getAttribute('category');
    const distance = this.getAttribute('distance');
    const description = this.getAttribute('description') || '';
    const link = this.getAttribute('link') || '';
    const isFavorite = this.getAttribute('isFavorite');

    this.innerHTML = `
    <li id=${id} class="restaurant pointer">
        <div class="restaurant__category">
          <img src="${CATEGORY_IMAGES[category]}" alt=${category} class="category-icon">
        </div>
        <img id ="handleFavorite" src="${FAVORITE_IMAGES[isFavorite]}" alt=${isFavorite} class="favorite-icon">
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
          <p class="restaurant__description text-body">${description}</p>
          <p class="restaurant__link">${link}</p>
        </div>
    </li>
    `;
  }

  getId() {
    this.addEventListener('click', (e) => {
      const clickedLi = e.target.closest('li');
      if (clickedLi) {
        const restaurantId = parseInt(clickedLi.getAttribute('id'));
        const restaurantInfo = restaurant.restaurants.find((info) => {
          if (info.id === restaurantId) {
            return info;
          }
        });
        this.showRestaurantDetails(restaurantInfo);
      }
    });
  }

  showRestaurantDetails(restaurantInfo) {
    const restaurantDetails = new RestaurantDetails();

    $('#modalContainer').appendChild(restaurantDetails);
    restaurantDetails.render(restaurantInfo);
    $('#modalContainer').classList.add('modal--open');
  }

  handleFavorite() {
    const handleFavoriteImg = this.querySelector('#handleFavorite');
    handleFavoriteImg.addEventListener('click', (e) => {
      e.stopPropagation();
      const clickedLi = e.target.closest('li');
      if (clickedLi) {
        const restaurantId = parseInt(clickedLi.getAttribute('id'));
        restaurant.restaurants.find((info) => {
          if (info.id === restaurantId) {
            return restaurant.addFavorite(info);
          }
        });
        const isFavorite = handleFavoriteImg.getAttribute('alt') === 'true';
        handleFavoriteImg.setAttribute('src', FAVORITE_IMAGES[!isFavorite]);
        handleFavoriteImg.setAttribute('alt', !isFavorite);
      }
    });
  }
}

export default RestaurantInfo;
