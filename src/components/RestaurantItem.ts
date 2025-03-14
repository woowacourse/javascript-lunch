import Component from '../core/Component.ts';
import { CATEGORY_MAP } from '../lib/constants.ts';
import type { RestaurantType } from '../lib/types.ts';
import { html } from '../lib/utils.ts';

interface RestaurantProps extends RestaurantType {}

export default class RestaurantItem extends Component<null, RestaurantProps> {
  override template() {
    return html` <li class="restaurant" data-id="${this.props?.id ?? ''}">
      <div class="restaurant__category">
        <img
          src="images/category-${CATEGORY_MAP[this.props?.category as keyof typeof CATEGORY_MAP]}.png"
          alt="${this.props?.category ?? ''}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__info--inner">
          <div>
            <h3 class="restaurant__name text-subtitle">${this.props?.name ?? ''}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${this.props?.distance ?? 5}분 내</span>
          </div>
          ${this.props?.isLike
            ? `<img src="images/star_filled.svg" alt="음식점 추가" id="like__button" data-id="${
                this.props?.id ?? ''
              }" />`
            : `<img src="images/star.svg" alt="음식점 추가" id="like__button" data-id="${this.props?.id ?? ''}" />`}
        </div>
        <p class="restaurant__description text-body">${this.props?.description ?? ''}</p>
      </div>
    </li>`;
  }
}
