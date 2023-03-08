import CustomElement from '../CustomElement';

class FavoriteIcon extends CustomElement {
  static get observedAttributes() {
    return ['favorite'];
  }

  get isAbsolute() {
    return this.hasAttribute('absolute');
  }

  get isFavorite() {
    return this.hasAttribute('favorite');
  }

  get restaurantName() {
    return this.getAttribute('restaurantName');
  }

  renderTemplate = () => {
    return `
      <div 
        id="favorite-icon" 
        class="${this.isFavorite ? 'favorite-icon' : 'not-favorite-icon'}
        ${this.isAbsolute && 'absolute-position'}">${this.isFavorite ? '★' : '☆'}</div>
      `;
  };

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  clickFavoriteIcon = () => {
    if (this.isFavorite) {
      this.removeAttribute('favorite');
    } else {
      this.setAttribute('favorite', '');
    }

    this.dispatchEvent(
      new CustomEvent('toggleFavorite', {
        bubbles: true,
        detail: {
          restaurantName: this.restaurantName,
        },
      }),
    );
  };

  initEventHandlers = () => {
    const $favoriteIcon = this.querySelector('#favorite-icon');

    if (!$favoriteIcon) return;

    $favoriteIcon.addEventListener('click', this.clickFavoriteIcon);
  };
}

customElements.define('r-favorite-icon', FavoriteIcon);

export default FavoriteIcon;
