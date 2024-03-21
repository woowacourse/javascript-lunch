import './RestaurantAddModal.css';

import type RestaurantList from '@/domain/RestaurantList';

import Modal from '../Modal';

import RestaurantForm from '@/components/restaurantForm/RestaurantForm';
import dom from '@/utils/dom';

interface IAddModalProps {
  restaurantList: RestaurantList;
}

class RestaurantAddModal extends Modal<IAddModalProps> {
  render() {
    const $modalContainer = dom.getTargetElement(this.$target, '.modal-add-container');
    new RestaurantForm($modalContainer, {
      restaurantList: this.props.restaurantList,
      handleResetModal: this.handleResetModal.bind(this),
    });
  }

  setEvent() {
    const $modalBackdrop = dom.getTargetElement(this.$target, '.modal-backdrop');
    $modalBackdrop.addEventListener('click', this.handleResetModal.bind(this));
  }

  handleResetModal() {
    dom.getElement('#error-link').classList.add('hidden');
    const $form = dom.getElement<HTMLFormElement>('form');
    $form.reset();
    this.toggle();
  }
}

export default RestaurantAddModal;
