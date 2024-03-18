export const RESTAURANT_DETAIL_EVENTS = {
  delete: 'restaurantItemDelete',
  close: 'restaurantDetailClose',
};

export default class RestaurantDetail extends HTMLElement {
  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-detail');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  connectedCallback() {
    this.#updateFavoriteIcon();
    this.querySelector('.restaurant-detail__favorite-button').addEventListener(
      'click',
      this.#handleFavoriteClick.bind(this),
    );

    this.querySelector('.button-container').addEventListener('click', this.#handleButtonClick.bind(this));

    document.addEventListener('restaurantDetailOpen', (event) => {
      const restaurantDetailContent = event.detail;
      this.#createRestaurantDetailContent(restaurantDetailContent);
    });
  }

  #createRestaurantDetailContent(restaurantDetailContent) {
    const restaurantDetail = document.querySelector('.detail-container');
    const { category, name, distance, description, link } = restaurantDetailContent;

    restaurantDetail.querySelector('.category-icon').src = this.#getCategoryIconUrl(category);
    restaurantDetail.querySelector('.category-icon').alt = category;

    restaurantDetail.querySelector('.restaurant-detail__name').textContent = name;
    restaurantDetail.querySelector('.restaurant-detail__distance').textContent = `캠퍼스로부터 ${distance}분 내`;
    restaurantDetail.querySelector('.restaurant-detail__description').textContent = description;

    const linkElement = restaurantDetail.querySelector('.restaurant-detail__link');
    const updatedLinkElement = this.#setupLinkElement(linkElement, link);
    linkElement.parentNode.replaceChild(updatedLinkElement, linkElement);
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

  #setupLinkElement(linkElement, link) {
    const updatedLinkElement = linkElement.cloneNode(true);
    updatedLinkElement.textContent = link;
    updatedLinkElement.href = link;
    updatedLinkElement.target = '_blank';
    updatedLinkElement.addEventListener('click', (event) => {
      event.stopPropagation();
    });

    return updatedLinkElement;
  }

  #handleFavoriteClick() {
    const isFavorite = this.#toggleFavorite();
    this.#updateFavoriteIcon(isFavorite);
  }

  #toggleFavorite() {
    const isFavorite = JSON.parse(localStorage.getItem('favorite')) || false;
    const updatedFavorite = !isFavorite;
    localStorage.setItem('favorite', updatedFavorite);
    return updatedFavorite;
  }

  #updateFavoriteIcon(isFavorite) {
    const favoriteIcon = this.querySelector('.restaurant-detail__favorite-button img');
    const favorite = isFavorite !== undefined ? isFavorite : JSON.parse(localStorage.getItem('favorite')) || false;
    favoriteIcon.src = favorite ? './favorite-icon-filled.png' : './favorite-icon-lined.png';
  }

  #handleButtonClick(event) {
    console.log('button Container');
    if (event.target.classList.contains('button--primary')) {
      this.#handleClose();
    } else if (event.target.classList.contains('button--secondary')) {
      this.#handleDelete();
    }
  }

  // eslint-disable-next-line max-lines-per-function
  #handleDelete() {
    const restaurantId = this.getAttribute('data-id');

    localStorage.removeItem(restaurantId);

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.delete, {
        bubbles: true,
        detail: { id: restaurantId },
      }),
    );

    this.#handleClose();
  }

  #handleClose() {
    console.log('close');
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.close, {
        bubbles: true,
      }),
    );
  }
}
