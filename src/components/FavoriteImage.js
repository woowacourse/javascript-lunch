import filled from '../assets/favorite-icon-filled.png';
import lined from '../assets/favorite-icon-lined.png';

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
          padding:4px;
          border-radius:8px;
          cursor:pointer;
          transition: background-color 0.3s;
        }

        img:hover{
          background-color: var(--grey-100);
        }
    `;

    this.shadowRoot.append(componentStyle);
  }
}

export default FavoriteImage;
