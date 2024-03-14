import Restaurant from '../../../domain/Restaurant';
import { $ } from '../../../utils/domSelector';

class RestaurantInfo extends HTMLElement {
  private restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    super();
    this.restaurant = restaurant;
  }

  connectedCallBack() {
    this.render();
    this.addEvent();
  }

  private addEvent() {
    const deleteRestaurant = $('#delete-restaurant');
    if (deleteRestaurant) {
      deleteRestaurant.addEventListener('click', (event: Event) => {
        event.preventDefault();
      });
    }

    const closeRestaurantInfoModal = $('#close-Restaurant-Info-modal');
    if (closeRestaurantInfoModal) {
      closeRestaurantInfoModal.addEventListener('click', (event: Event) => {
        event.preventDefault();
      });
    }
  }

  private render() {}
}
