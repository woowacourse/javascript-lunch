import { IComponentPropState } from '../interfaces/IComponent';
import Component from '../core/Component';
import imagePaths from '../constants/imagePaths';
import IRestaurantInput from '../interfaces/IRestaurantInput';
import { setLocalStorageItem } from '../utils/localStroageUtils';

class Restaurant extends Component<IComponentPropState> {
  template() {
    const { category, name, distance, description, isFavorite } =
      this.$props.restaurant;

    return `<li class="restaurant">
        <div class="restaurant__category">
          <img src=${
            imagePaths.mainListIconImage[category]
          } alt=${category} class="category-icon"/>
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
          <p class="restaurant__description text-body">${description}</p>
          <img class='restaurant__favorite__icon' src=${
            isFavorite
              ? imagePaths.isFavoriteIconImage.isFavorite
              : imagePaths.isFavoriteIconImage.notFavorite
          } alt="자주 가는 음식점" />
        </div>
      </li>`;
  }

  updateRestaurantIsFavorite(
    restaurant: IRestaurantInput,
    originalRestaurantList: IRestaurantInput[],
    updateRootState: Function
  ) {
    const restaurantList = originalRestaurantList.map((r: IRestaurantInput) =>
      r.name === restaurant.name ? { ...r, isFavorite: !r.isFavorite } : r
    );

    setLocalStorageItem('restaurantList', restaurantList);
    updateRootState({ restaurantList });
  }

  setEvent(): void {
    const { originalRestaurantList, updateRootState, restaurant } = this.$props;

    this.addEvent('click', '.restaurant__favorite__icon', () => {
      this.updateRestaurantIsFavorite(
        restaurant,
        originalRestaurantList,
        updateRootState
      );
    });

    this.addEvent('click', '.restaurant', (event: Event) => {
      if (
        event.target instanceof HTMLElement &&
        !event.target.classList.contains('restaurant__favorite__icon')
      ) {
        this.$props.toggleModal('restaurantDetail', this.$props.restaurant);
      }
    });
  }
}

export default Restaurant;
