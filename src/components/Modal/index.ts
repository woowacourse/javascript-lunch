import { CLASS, ID } from '../../constants';
import RestaurantListItem, {
  IRestaurant,
} from '../../domain/RestaurantListItem';
import RestaurantList from '../RestaurantList';
import ButtonContainer from './ButtonContainer';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import DistanceInput from './DistanceInput';
import LinkInput from './LinkInput';
import ModalHeader from './ModalHeader';
import NameInput from './NameInput';

const Modal = {
  template() {
    return `
      <div class="${CLASS.MODAL}">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          ${ModalHeader.template()}
          <form id="${ID.ADD_FORM}">
            ${CategoryInput.template()}
            ${NameInput.template()}
            ${DistanceInput.template()}
            ${DescriptionInput.template()}
            ${LinkInput.template()}
            ${ButtonContainer.template()}
          </form>
        </div>
      </div>`;
  },
  setEvent(restaurantListItem: RestaurantListItem) {
    ButtonContainer.setEvent();
    this.restaurantEvent(restaurantListItem);
  },
  restaurantEvent(RestaurantListItem: RestaurantListItem) {
    const addForm = document.querySelector(
      `#${ID.ADD_FORM}`,
    ) as HTMLFormElement;

    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const newRestaurant = Object.fromEntries(
        [...new FormData(e.target as HTMLFormElement)].map(([key, value]) => {
          return [key, key === 'distance' ? Number(value) : value];
        }),
      ) as unknown as IRestaurant;
      RestaurantList.update(RestaurantListItem.add(newRestaurant));

      this.formReset();
      this.closeModal();
    });
  },
  openModal() {
    const modal = document.querySelector(`.${CLASS.MODAL}`) as HTMLElement;
    modal.className = CLASS.MODAL_OPEN;
  },
  closeModal() {
    const modal = document.querySelector(`.${CLASS.MODAL_OPEN}`) as HTMLElement;
    modal.className = CLASS.MODAL;
  },
  formReset() {
    const addForm = document.querySelector(
      `#${ID.ADD_FORM}`,
    ) as HTMLFormElement;
    addForm.reset();
  },
};

export default Modal;
