import RestaurantListItem, { IRestaurant } from '../../domain/RestaurantListItem';
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
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        ${ModalHeader.template()}
        <form id="addForm">
          ${CategoryInput.template()}
          ${NameInput.template()}
          ${DistanceInput.template()}
          ${DescriptionInput.template()}
          ${LinkInput.template()}
          ${ButtonContainer.template()}
        </form>
      </div>`;
  },
  setEvent(restaurantListItem: RestaurantListItem) {
    ButtonContainer.setEvent();
    this.restaurantEvent(restaurantListItem);
  },
  restaurantEvent(RestaurantListItem: RestaurantListItem) {
    const restaurantListContainer = document.querySelector('.restaurant-list-container') as HTMLDivElement;
    const addForm = document.querySelector('#addForm') as HTMLFormElement;

    addForm?.addEventListener('submit', (e) => {
      e.preventDefault();

      const newRestaurant = Object.fromEntries(
        [...new FormData(e.target as HTMLFormElement)].map(([key, value]) => {
          return [key, key === 'distance' ? Number(value) : value];
        })
      ) as unknown as IRestaurant;
      restaurantListContainer.innerHTML = RestaurantList.template(RestaurantListItem.add(newRestaurant));

      addForm.reset();
      this.closeModal();
    });
  },
  closeModal() {
    const modal = document.querySelector('.modal--open') as HTMLElement;
    modal.className = 'modal';
  },
};

export default Modal;
