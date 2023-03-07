import RestaurantListItem from '../../domain/RestaurantListItem';
import AddButton from './AddButton';
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
          ${AddButton.template()}
        </form>
      </div>`;
  },
  setEvent(restaurantListItem: RestaurantListItem) {
    AddButton.setEvent(restaurantListItem);
  },
};

export default Modal;
