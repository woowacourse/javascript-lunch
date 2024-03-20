import { IMAGE_MAP } from '../constants/imageMap';
import { CATEGORY, DISTANCE } from '../constants/constants';
import { Restaurant } from '../types/types';
import Component from './Component';

class RestCardComponent extends Component {
  protected render(props: Restaurant) {
    const { category, name, distance, description, link } = props;

    this.checkTypeProps(props);

    return `
    <li class="rest-card">
      <div class="rest-card__category">
        <img src=${IMAGE_MAP.category[category]} alt=${CATEGORY[category]} class="category-icon">
      </div>
      <div class="rest-card__info">
        <h3 class="rest-card__name text-subtitle">${name}</h3>
        <span class="rest-card__distance text-body">캠퍼스부터 ${DISTANCE[distance]}분 내</span>
        <p class="rest-card__description text-body">${description}</p>
      </div>
    </li>
    `;
  }

  protected setEvents() {}

  private checkTypeProps(restaurant: Restaurant): restaurant is Restaurant {
    const { category, name, distance, description, link } = restaurant;

    const isCategoryValid = Object.keys(CATEGORY).includes(category);
    const isNameValid = typeof name === 'string';
    const isDistanceValid = Object.keys(DISTANCE).includes(distance);
    const isDescriptionValid = typeof description === 'string';
    const isLinkValid = typeof link === 'string';

    if (!isCategoryValid || !isNameValid || !isDistanceValid || !isDescriptionValid || !isLinkValid) {
      throw new Error(`Invalid Restaurant Object: ${JSON.stringify(restaurant)}`);
    }

    return true;
  }
}

customElements.define('rest-card', RestCardComponent);
