import { CLASS } from '../../../constants';
import RestaurantListItem, { IRestaurant } from '../../../domain/RestaurantListItem';
import RestaurantDetail from './RestaurantDetail';

const DetailModal = {
  template(restaurant: IRestaurant) {
    return `
      <dialog class="${CLASS.DETAIL_MODAL}">
        <div class="modal-backdrop"></div>
          <div class="${CLASS.MODAL_CONTAINER}">
              ${RestaurantDetail.template(restaurant)}
            </div>
          </div>
      </dialog>`;
  },
  setEvent(RestaurantListItem: RestaurantListItem) {
    RestaurantDetail.setEvent(RestaurantListItem);
  },
  openModal(restaurant: IRestaurant) {
    const modal = document.querySelector(`.${CLASS.DETAIL_MODAL}`) as HTMLElement;
    modal.className = CLASS.MODAL_OPEN;

    const modalContainer = document.querySelector(`.${CLASS.MODAL_CONTAINER}`) as HTMLElement;
    modalContainer.innerHTML = RestaurantDetail.template(restaurant);
  },
  closeModal() {
    const modal = document.querySelector(`.${CLASS.MODAL_OPEN}`) as HTMLElement;
    modal.className = CLASS.DETAIL_MODAL;
  },
};

export default DetailModal;
