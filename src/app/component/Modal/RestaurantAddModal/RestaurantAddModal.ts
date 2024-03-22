import Modal from '../Modal';
import RestaurantAddForm from '../../RestaurantAddForm/RestaurantAddForm';
import { ModalType } from '../../../type/modalType';
import { RestaurantDataType } from '../../../type/restaurantTypes';

type RestaurantAddModalType = ModalType & {
  onSubmit: (restaurantData: RestaurantDataType) => void;
};

export default class RestaurantAddModal extends Modal {
  private form: RestaurantAddForm;
  private addNewRestaurant: (restaurantData: RestaurantDataType) => void;

  constructor({ title, id, onSubmit }: RestaurantAddModalType) {
    super({ title, id });
    this.addNewRestaurant = onSubmit;
    this.form = new RestaurantAddForm({
      parentComponent: this,
      onCancel: this.closeModal.bind(this),
      onSubmit: this.handleSubmit.bind(this),
    });
    this.modalContainer.appendChild(this.form.render());
  }

  private handleSubmit(restaurantData: RestaurantDataType) {
    this.addNewRestaurant(restaurantData);
    this.closeModal();
  }
}
