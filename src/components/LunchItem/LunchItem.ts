import './style.css';

import { LIKED, NOT_LIKED } from '../../imgs/index';
import { Category, Distance } from '../../types/index';
import { CATEGORY_IMG } from '../../constants/categoriesImage';

export type LunchItemProps = {
  [key: string]: string | Category | Distance | number;
  category: Category;
  name: string;
  distance: Distance;
  description: string;
  liked: string;
  link: string;
};

// eslint-disable-next-line max-lines-per-function
const LUNCH_ITEM_TEMPLATE = ({
  category,
  name,
  distance,
  description,
  liked,
}: LunchItemProps) => /* HTML */ `
  <li class="restaurant">
    <div class="restaurant__category--img">
      <img src=${CATEGORY_IMG[category]} alt=${category} class="category-icon" />
    </div>
    <div class="restaurant__info">
      <div class="restaurant__info--header">
        <div class="restaurant__info--title">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        </div>
        <div class="restaurant__info--liked">
          <img src=${liked === 'true' ? LIKED : NOT_LIKED} alt="liked" class="liked-icon" />
        </div>
      </div>
      <div class="restaurant__info--description">
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </div>
  </li>
`;

const LUNCH_DETAIL_MODAL_TEMPLATE = (restaurant: LunchItemProps) => /* HTML */ `
  <lunch-detail-modal
    category="${restaurant.category}"
    name="${restaurant.name}"
    distance="${restaurant.distance}"
    description="${restaurant.description ?? ''}"
    liked="${restaurant.liked}"
    link="${restaurant.link ?? ''}"
  ></lunch-detail-modal>
`;

class LunchItem extends HTMLElement {
  connectedCallback(): void {
    this.render();
    this.setEventListener();
  }

  getAttributes(): LunchItemProps {
    const category: Category = (this.getAttribute('category') as Category) ?? '기타';
    const name: string = this.getAttribute('name') ?? '';
    const distance: Distance = (Number(this.getAttribute('distance')) as Distance) ?? 10;
    const description: string = this.getAttribute('description') ?? '';
    const liked: string = this.getAttribute('liked') ?? '';
    const link: string = this.getAttribute('link') ?? '';
    return { category, name, distance, description, liked, link };
  }

  render() {
    this.innerHTML = LUNCH_ITEM_TEMPLATE(this.getAttributes());
  }

  setEventListener() {
    const clickLiked = this.querySelector('.liked-icon');
    clickLiked?.addEventListener('click', () => this.setClickLikedEvent());
    this.addEventListener('click', () => this.handleDetailModal());
  }

  setClickLikedEvent() {
    const clickLikedButtonEvent = new CustomEvent('clickLikedButton', { bubbles: true });
    this.dispatchEvent(clickLikedButtonEvent);
  }

  handleDetailModal() {
    // TODO : 리팩터링
    const lunchDetailModal = document.querySelector('lunch-detail-modal');
    const lunchDetailModalChild = document.querySelector('.detail-modal');
    if (!lunchDetailModal) {
      this.insertAdjacentHTML('afterend', LUNCH_DETAIL_MODAL_TEMPLATE(this.getAttributes()));
    } else {
      const attributesToSet = this.getAttributes();
      for (const key in attributesToSet) {
        lunchDetailModal.setAttribute(key, attributesToSet[key].toString());
      }
      lunchDetailModalChild?.classList.add('detail-modal--open');
    }
  }
}

customElements.define('lunch-item', LunchItem);
