import Modal from '../Modal';
import RestaurantAddModalContent from './RestaurantAddModalContent';

function RestaurantAddModal() {
  return Modal({
    content: RestaurantAddModalContent(),
  });
}

export default RestaurantAddModal;
