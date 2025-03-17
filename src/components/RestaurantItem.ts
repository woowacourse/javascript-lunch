import { Component } from './core/index.ts';
import { CATEGORY_MAP } from '../lib/constants.ts';
import type { RestaurantType } from '../lib/types.ts';
import { html } from '../lib/utils.ts';

interface RestaurantProps extends RestaurantType {}

export default class RestaurantItem extends Component<RestaurantProps> {
  override template() {
    return html` <li class="restaurant" data-id="${this.props.id ?? ''}" data-action="restaurant-detail">
      <div class="restaurant__category">
        <img
          src="images/category-${CATEGORY_MAP[this.props.category as keyof typeof CATEGORY_MAP]}.png"
          alt="${this.props.category ?? ''}"
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__info--inner">
          <div>
            <h3 class="restaurant__name text-subtitle">${this.props.name ?? ''}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${this.props.distance ?? 5}분 내</span>
          </div>
          <img
            src="images/star${this.props.isLike ? '_filled' : ''}.svg"
            alt="음식점 추가"
            data-id="${this.props.id ?? ''}"
            data-action="restaurant-like"
          />
        </div>
        <p class="restaurant__description text-body">${this.props.description ?? ''}</p>
      </div>
    </li>`;
  }
}
