import favoriteIconFilled from '@assets/favorite-icon-filled.png';
import favoriteIconLined from '@assets/favorite-icon-lined.png';

class FavoriteIcon extends HTMLImageElement {
  static observedAttributes = ['clicked'];

  constructor() {
    super();
    this.src = favoriteIconLined;
    this.alt = '즐겨찾기 아이콘';
    this.setAttribute('clicked', 'off');

    this.#setEvent();
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'clicked') {
      if (newValue === 'on') {
        this.src = favoriteIconFilled;
      } else if (newValue === 'off') {
        this.src = favoriteIconLined;
      }
    }
  }

  #setEvent() {
    this.addEventListener('click', () => {
      if (this.getAttribute('clicked') === 'off') {
        this.setAttribute('clicked', 'on');
      } else {
        this.setAttribute('clicked', 'off');
      }
    });
  }
}

customElements.define('favorite-icon', FavoriteIcon, { extends: 'img' });

export default FavoriteIcon;
