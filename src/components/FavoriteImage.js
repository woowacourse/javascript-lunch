import lined from '../assets/favorite-icon-lined.png';
import filled from '../assets/favorite-icon-filled.png';

class FavoriteImage extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
    this.setComponentStyle();
  }

  static get observedAttributes() {
    return ['isFavorite'];
  }

  render() {
    const isFavorite = this.getAttribute('isFavorite');

    this.shadowRoot.innerHTML = `
    <img src="${isFavorite === 'true' ? filled : lined}" alt="isFavorite">
    `;
  }

  setComponentStyle() {
    const componentStyle = document.createElement('style');
    componentStyle.textContent = `
        img{
          width:26.67px;
          height:25.33px;
          cursor:pointer;
        }
    `;

    this.shadowRoot.append(componentStyle);
  }
}

export default FavoriteImage;
