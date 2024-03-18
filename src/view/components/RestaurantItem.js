/* eslint-disable max-lines-per-function */
import RestaurantManager from '../../domain/RestaurantManager.ts';

export default class RestaurantItem extends HTMLLIElement {
  constructor() {
    super();
    this.#initialize();
  }

  static observedAttributes = ['data-restaurant'];

  #initialize() {
    this.#setupTemplate();
    this.classList.add('restaurant');
    this.#bindEventListeners();
    this.restaurantManager = new RestaurantManager();
    this.restaurantManager.loadRestaurantsFromLocalStorage();
    this.addEventListener('click', this.#handleRestaurantItemClick.bind(this));
  }

  get restaurant() {
    if (!this.dataset.restaurant) {
      return {};
    }
    return JSON.parse(this.dataset.restaurant);
  }

  set restaurant(value) {
    this.setAttribute('data-restaurant', JSON.stringify(value));
  }

  attributeChangedCallback() {
    this.#initRestaurantItem();
  }

  connectedCallback() {
    this.#initRestaurantItem();
  }

  #setupTemplate() {
    const template = document.querySelector('#template-restaurant-item');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  #bindEventListeners() {
    this.querySelector('.restaurant__favorite-button').addEventListener('click', this.#handleFavoriteClick.bind(this));
  }

  #initRestaurantItem() {
    const { category, name, distance, description, favorite } = this.restaurant;

    this.querySelector('.restaurant__name').textContent = name;
    this.querySelector('.restaurant__distance').textContent = `캠퍼스로부터 ${distance}분 내 `;
    this.querySelector('.restaurant__description').textContent = description;
    this.querySelector('.category-icon').src = this.#getCategoryIconUrl(category);
    this.querySelector('.category-icon').alt = category;
    this.#updateFavoriteIcon(favorite);
  }

  #getCategoryIconUrl(category) {
    if (category === '한식') return './category-korean.png';
    if (category === '중식') return './category-chinese.png';
    if (category === '일식') return './category-japanese.png';
    if (category === '양식') return './category-western.png';
    if (category === '아시안') return './category-asian.png';
    if (category === '기타') return './category-etc.png';
    return '';
  }

  #handleFavoriteClick(event) {
    event.stopPropagation();
    const restaurantName = this.querySelector('.restaurant__name').textContent;
    const restaurant = this.restaurantManager.restaurants.find((res) => res.name === restaurantName);
    if (restaurant) {
      restaurant.favorite = !restaurant.favorite;
      this.restaurantManager.updateLocalStorage();
      this.#updateFavoriteIcon(restaurant.favorite);
    }
  }

  #updateFavoriteIcon(isFavorite) {
    const iconImg = this.querySelector('.restaurant__favorite-button img');
    iconImg.src = isFavorite ? './favorite-icon-filled.png' : './favorite-icon-lined.png';
  }

  #handleRestaurantItemClick() {
    const modal = document.querySelector('#detailModal');
    const restaurantDetailContent = this.#createRestaurantDetailContent();

    this.#displayRestaurantDetailInModal(modal, restaurantDetailContent);
  }

  #setupLinkElement(linkElement, link) {
    const updatedLinkElement = linkElement.cloneNode(true); // 기존 요소를 복제하여 새로운 요소 생성
    updatedLinkElement.textContent = link;
    updatedLinkElement.href = link;
    updatedLinkElement.target = '_blank';
    updatedLinkElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    return updatedLinkElement;
  }

  #createRestaurantDetailContent() {
    const restaurantDetailTemplate = document.querySelector('#template-restaurant-detail');
    const restaurantDetailContent = restaurantDetailTemplate.content.cloneNode(true);
    const { category, name, distance, description, link } = this.restaurant;

    const restaurantDetail = restaurantDetailContent.querySelector('.detail-container');

    restaurantDetail.querySelector('.category-icon').src = this.#getCategoryIconUrl(category);
    restaurantDetail.querySelector('.category-icon').alt = category;

    restaurantDetail.querySelector('.restaurant-detail__name').textContent = name;
    restaurantDetail.querySelector('.restaurant-detail__distance').textContent = `캠퍼스로부터 ${distance}분 내`;
    restaurantDetail.querySelector('.restaurant-detail__description').textContent = description;

    const linkElement = restaurantDetail.querySelector('.restaurant-detail__link');
    const updatedLinkElement = this.#setupLinkElement(linkElement, link);
    linkElement.parentNode.replaceChild(updatedLinkElement, linkElement);

    return restaurantDetailContent;
  }

  #displayRestaurantDetailInModal(modal, content) {
    const modalContainer = modal.shadowRoot.querySelector('.modal-container');
    modalContainer.innerHTML = '';
    modalContainer.appendChild(content);
    modal.openModal();
  }
}
