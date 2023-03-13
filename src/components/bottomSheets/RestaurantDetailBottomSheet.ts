import { IComponentPropState } from '../../interfaces/IComponent';
import Component from '../../core/Component';
import imagePaths from '../../constants/imagePaths';
import IRestaurantInput from '../../interfaces/IRestaurantInput';
import { setLocalStorageItem } from '../../utils/localStroageUtils';

class RestaurantDetailBottomSheet extends Component<IComponentPropState> {
  template() {
    const { category, name, distance, description, link, isFavorite } =
      this.$props.restaurantData;

    return `
        <div class="restaurant__category">
          <img src=${
            imagePaths.mainListIconImage[category]
          } alt=${category} class="category-icon"/>
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
          <p class="restaurant__description text-body">${description}</p>
          <a class="restaurant__description text-body default-link" href=${link} target='_blank'>${link}</a>
          <img class='restaurant__favorite__icon' src=${
            isFavorite
              ? imagePaths.isFavoriteIconImage.isFavorite
              : imagePaths.isFavoriteIconImage.notFavorite
          } alt="자주 가는 음식점" />
        </div>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption delete-restaurant">삭제하기</button>
          <button class="button button--primary text-caption close-bottom-sheet">닫기</button>
        </div>
      `;
  }

  removeRestaurant(list: IRestaurantInput[], name: string): IRestaurantInput[] {
    const index = list.findIndex((restaurant) => restaurant.name === name);
    if (index !== -1) {
      list.splice(index, 1);
    }
    return list;
  }

  updateRestaurantIsFavorite(
    restaurant: IRestaurantInput,
    originalRestaurantList: IRestaurantInput[],
    updateRootState: Function
  ) {
    const restaurantList = originalRestaurantList.map((r: IRestaurantInput) =>
      r.name === restaurant.name ? { ...r, isFavorite: !r.isFavorite } : r
    );

    const updatedBottomSheetData = restaurantList.find(
      (_restaurant) => _restaurant.name === restaurant.name
    );

    setLocalStorageItem('restaurantList', restaurantList);
    updateRootState({
      restaurantList,
      bottomSheetData: updatedBottomSheetData,
    });
  }

  setEvent() {
    const { toggleModal, updateRootState, restaurantList, restaurantData } =
      this.$props;

    this.addEvent('click', '.close-bottom-sheet', () => {
      toggleModal('');
    });

    this.addEvent('click', '.delete-restaurant', () => {
      const removedList = this.removeRestaurant(
        restaurantList,
        restaurantData.name
      );
      setLocalStorageItem('restaurantList', removedList);
      updateRootState({ removedList });
      toggleModal();
    });

    this.addEvent('click', '.restaurant__favorite__icon', () => {
      this.updateRestaurantIsFavorite(
        restaurantData,
        restaurantList,
        updateRootState
      );
    });
  }
}

export default RestaurantDetailBottomSheet;
