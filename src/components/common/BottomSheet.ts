import Component from '../../core/Component';
import { IComponentPropState } from '../../interfaces/IComponent';
import AddRestaurantBottomSheet from '../bottomSheets/AddRestaurantBottomSheet';
import RestaurantDetailBottomSheet from '../bottomSheets/RestaurantDetailBottomSheet';

class BottomSheet extends Component<IComponentPropState> {
  template(): string {
    const { isModalOpened } = this.$props;

    return ` 
      ${
        isModalOpened
          ? `    <!-- 음식점 추가 모달 -->
          <div class='modal modal--open'>
            <div class='modal-backdrop'></div>
            <div class='modal-container'>
              <div class='modal-content'></div>
            </div>
          </div>`
          : ''
      }
    `;
  }

  mounted() {
    const $target = this.$target.querySelector<HTMLElement>('.modal-content');
    const { bottomSheetType } = this.$props;

    if ($target) {
      switch (bottomSheetType) {
        case 'addRestaurant':
          new AddRestaurantBottomSheet($target, {
            toggleModal: this.$props.toggleModal,
            updateRootState: this.$props.updateRootState,
            restaurantList: this.$props.restaurantList,
          });
          break;
        case 'restaurantDetail':
          new RestaurantDetailBottomSheet($target, {
            toggleModal: this.$props.toggleModal,
            updateRootState: this.$props.updateRootState,
            restaurantList: this.$props.restaurantList,
            restaurantData: this.$props.bottomSheetData,
            updateBottomSheetData: this.$props.updateBottomSheetData,
          });
          break;
      }
    }
  }

  setEvent() {
    this.addEvent('click', '.modal-backdrop', () => {
      this.$props.toggleModal();
    });
  }
}

export default BottomSheet;
