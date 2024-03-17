import Modal from './Modal';

const restaurantDetailLayout = document.createElement('div');

class RestaurantDetailModal extends Modal {
  constructor() {
    super({ child: restaurantDetailLayout });
  }
}

export default RestaurantDetailModal;
