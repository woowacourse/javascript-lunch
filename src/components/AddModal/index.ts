import { CLASS, ID } from '../../constants';
import RestaurantListItem, { IRestaurant } from '../../domain/RestaurantListItem';
import RestaurantList from '../RestaurantList';
import ButtonContainer from './ButtonContainer';
import CategoryInput from './CategoryInput';
import DescriptionInput from './DescriptionInput';
import DistanceInput from './DistanceInput';
import LinkInput from './LinkInput';
import ModalHeader from './ModalHeader';
import NameInput from './NameInput';

const AddModal = {
  template() {
    return `
      <div class="${CLASS.ADD_MODAL}">
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
    const addForm = document.querySelector(`#${ID.ADD_FORM}`) as HTMLFormElement;

    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const restaurantForm = [...new FormData(e.target as HTMLFormElement)].map(([key, value]) => {
        return [key, key === 'distance' ? Number(value) : value];
      });
      const id = RestaurantListItem.getListItem().length;
      const newRestaurant: IRestaurant = Object.fromEntries([...restaurantForm, ['favorite', false], ['id', String(id)]]);
      RestaurantListItem.add(newRestaurant);
      RestaurantList.append(newRestaurant);

      this.formReset();
      this.closeModal();
    });
  },
  openModal() {
    const modal = document.querySelector(`.${CLASS.ADD_MODAL}`) as HTMLElement;
    modal.className = CLASS.MODAL_OPEN;
  },
  closeModal() {
    const modal = document.querySelector(`.${CLASS.MODAL_OPEN}`) as HTMLElement;
    modal.className = CLASS.ADD_MODAL;
  },
  formReset() {
    const addForm = document.querySelector(`#${ID.ADD_FORM}`) as HTMLFormElement;
    addForm.reset();
  },
};

export default AddModal;
