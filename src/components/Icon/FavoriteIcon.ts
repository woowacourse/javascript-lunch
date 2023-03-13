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
      this.hasAttribute('isfavorite') ? favoriteIconFilled : favoriteIconLined
    }' class='favorite-icon'>`;
  }

  static get observedAttributes() {
    return ['isfavorite'];
  }

  attributeChangedCallback() {
    if (this.querySelector('img')) {
      this.querySelector('img')!.src = this.hasAttribute('isfavorite')
        ? favoriteIconFilled
        : favoriteIconLined;
    }
  }
}

export default FavoriteIcon;
