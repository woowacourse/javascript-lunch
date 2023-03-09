import { IRestaurant } from '../../types';
import RestaurantDetail from './ResraurantDetail';
import RestaurantAddForm from './RestaurantAddForm';

const Modal = {
  render(targetElement: Element, restaurant?: IRestaurant) {
    if (restaurant) {
      targetElement.innerHTML = this.getTemplate(restaurant);

      return;
    }

    targetElement.innerHTML = this.getTemplate();
  },

  getTemplate(restaurant?: IRestaurant) {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      ${this.getModalContent(restaurant)}
    </div>
    `;
  },

  getModalContent(restaurant?: IRestaurant) {
    if (restaurant) {
      return RestaurantDetail.getTemplate(restaurant);
    }

    return RestaurantAddForm.getTemplate();
  },
};

export default Modal;
