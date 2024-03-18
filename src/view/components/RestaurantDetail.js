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
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_DETAIL_EVENTS.close, {
        bubbles: true,
      }),
    );
  }
}
