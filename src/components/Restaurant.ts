import { IComponentPropState } from '../interfaces/IComponent';
import Component from '../core/Component';
import imagePaths from '../constants/imagePaths';

class Restaurant extends Component<IComponentPropState> {
  template() {
    const { category, name, distance, description } = this.$props.restaurant;
    return `<li class="restaurant">
        <div class="restaurant__category">
          <img src=${imagePaths.mainListIconImage[category]} alt=${category} class="category-icon"/>
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
          <p class="restaurant__description text-body">${description}</p>
          <button id=${name} class='star'></button>
        </div>
      </li>`;
  }
}

export default Restaurant;
