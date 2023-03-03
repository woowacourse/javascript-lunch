import Component from '@res/core/Component';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';

interface ImageByCategory {
  [key: string]: string;
}

const ImageByCategory: ImageByCategory = {
  한식: './category-korean.png',
  일식: './category-japanese.png',
  중식: './category-chinese.png',
  양식: './category-western.png',
  아시안: './category-asian.png',
};

class ListContainer extends Component {
  template() {
    const { restaurantList } = this.$props;

    return `<ul class="restaurant-list">
    ${restaurantList
      .map((restaurant: IRestaurantInput) => {
        const { category, name, distance, description } = restaurant;
        return `<li class="restaurant">
      <div class="restaurant__category">
        <img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
        <p class="restaurant__description text-body">${description}</p>
      </div>
    </li>`;
      })
      .join('')}
    </ul>`;
  }

  setEvent(): void {}
}

export default ListContainer;
