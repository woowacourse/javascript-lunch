import './style.css';

import { KOREAN, CHINESE, JAPANESE, ASIAN, WESTERN, ETC } from '../../imgs/index';
import { Category, Distance } from '../../types/index';

type LunchItemProps = {
  category: Category;
  name: string;
  distance: Distance;
  description: string;
};

export const CATEGORY_IMG = {
  한식: KOREAN,
  중식: CHINESE,
  일식: JAPANESE,
  아시안: ASIAN,
  양식: WESTERN,
  기타: ETC,
} as const;

const LUNCH_ITEM_TEMPLATE = ({ category, name, distance, description }: LunchItemProps) => /* HTML */ `<li class="restaurant">
    <div class="restaurant__category">
      <img src=${CATEGORY_IMG[category]} alt=${category} class="category-icon">
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${name}</h3>
      <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
      <p class="restaurant__description text-body">${description}</p>
    </div>
  </li>
`;

class LunchItem extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  getAttributes(): LunchItemProps {
    const category: Category = (this.getAttribute('category') as Category) ?? '기타';
    const name: string = this.getAttribute('name') ?? '';
    const distance: Distance = (Number(this.getAttribute('distance')) as Distance) ?? 10;
    const description: string = this.getAttribute('description') ?? '';
    return { category, name, distance, description };
  }

  render() {
    this.innerHTML = LUNCH_ITEM_TEMPLATE(this.getAttributes());
  }
}

customElements.define('lunch-item', LunchItem);
