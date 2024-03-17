import Modal from '../Modal';
import RestaurantAddForm from '../../component/RestaurantAddForm/RestaurantAddForm';
import { RestaurantAddModalType } from '../../../type/modalTypes';
import { RestaurantDataType } from '../../../type/restaurantTypes';

export default class RestaurantAddModal extends Modal {
  private form: RestaurantAddForm;
  private addNewRestaurant: Function;

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
