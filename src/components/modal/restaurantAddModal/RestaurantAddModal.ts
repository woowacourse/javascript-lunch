import './RestaurantAddModal.css';

import type RestaurantList from '@/domain/RestaurantList';

import Modal from '../Modal';

import RestaurantForm from '@/components/RestaurantForm';
import dom from '@/utils/dom';

interface IAddModalProps {
  restaurantList: RestaurantList;
}

class RestaurantAddModal extends Modal<IAddModalProps> {
  render() {
    const $modalContainer = dom.getTargetElement(this.$target, '.modal-container');
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
    this.toggle();
    dom.getElement('#error-link').classList.add('hidden');
    const $form = dom.getElement('form') as HTMLFormElement;
    $form.reset();
  }
}

export default RestaurantAddModal;
