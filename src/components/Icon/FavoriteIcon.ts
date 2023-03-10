import favoriteIconFilled from '../../../assets/favorite-icon-filled.png';
import favoriteIconLined from '../../../assets/favorite-icon-lined.png';

class FavoriteIcon extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <style>
      .favorite-icon[isfavorite] {
        
      }

      .favorite-icon:hover {
        cursor: pointer;
      }
    </style> 

    <img src='${
      this.hasAttribute('isfavorite') ? favoriteIconLined : favoriteIconFilled
    }' class='favorite-icon'>`;
  }

  static get observedAttributes() {
    return ['isfavorite'];
  }

  attributeChangedCallback() {
    this.querySelector('img')!.src = this.hasAttribute('isfavorite')
      ? favoriteIconLined
      : favoriteIconFilled;
  }
}

export default FavoriteIcon;
