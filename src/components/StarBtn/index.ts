import './style.css';
import StarFillIcon from '../../assets/svg/favorite-icon-filled.svg';
import StarLineIcon from '../../assets/svg/favorite-icon-lined.svg';

class StarBtn extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const isLikeStr = this.getAttribute('isLike');
    const isLike = isLikeStr === 'true';
    const starIcon = isLike ? StarFillIcon : StarLineIcon;

    this.innerHTML = /*html*/ `
      <img src="${starIcon}" alt="좋아요 버튼" class="star-btn__img" />
    `;
  }
}

customElements.define('star-btn', StarBtn);
