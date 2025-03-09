import Component from '../core/Component.ts';
import { CATEGORY_MAP } from '../lib/constants.ts';

interface RestaurantProps {
  name: string;
  category: string;
  distance: number;
  description: string;
  isLike: boolean;
}

export default class Restaurant extends Component<null, RestaurantProps> {
  template() {
    return `
      <li class="restaurant" data-name="${this.props.name}">
      <div class="restaurant__category">
        <img
          src="./public/images/category-${CATEGORY_MAP[this.props.category as keyof typeof CATEGORY_MAP]}.png"
          alt="${this.props.category}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__info--inner">
          <div>
            <h3 class="restaurant__name text-subtitle">${this.props.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${this.props.distance}분 내</span>
          </div>
          ${
            this.props.isLike
              ? `<img src="./public/images/star_filled.svg" alt="음식점 추가" id="like__button" data-name="${this.props.name}" />`
              : `<img src="./public/images/star.svg" alt="음식점 추가" id="like__button" data-name="${this.props.name}" />`
          }
        </div>
        <p class="restaurant__description text-body">
          ${this.props.description}
        </p>
      </div>
    </li>`;
  }
}
