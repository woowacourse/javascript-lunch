import { Restaurant } from '../type';
import Component from './Component';
import { CATEGORY_IMAGE_URL } from '../utils/constants';

interface RestaurantListItemProps {
  restaurant: Restaurant;
}

interface RestaurantListItemState {}

class RestaurantListItem extends Component<RestaurantListItemProps, RestaurantListItemState> {
  constructor($parent: HTMLElement, props: RestaurantListItemProps) {
    super({
      $parent,
      props,
      tagName: 'li',
      initialState: {},
    });
    this.$wrapper.className = 'restaurant';
  }

  drawInnerHTML() {
    const { category, name, distance, description } = this.props.restaurant;
    return `
      <div class="restaurant__category">
        <img src="${CATEGORY_IMAGE_URL[category]}"" alt="${category}" class="category-icon" />
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    `;
  }
}

export default RestaurantListItem;
