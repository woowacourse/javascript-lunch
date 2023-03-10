import lined from '../assets/favorite-icon-lined.png';
import filled from '../assets/favorite-icon-filled.png';

class FavoriteImage extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        img{
          width:26.67px;
          height:25.33px;
        }
    `;

    const isFavorite = this.getAttribute('isFavorite');

    this.shadowRoot.innerHTML = `
    <img src="${isFavorite === 'true' ? filled : lined}" alt="isFavorite">
    `;

    this.shadowRoot.append(componentStyle);
  }

  static get observedAttributes() {
    return ['isFavorite'];
  }
}

export default FavoriteImage;
