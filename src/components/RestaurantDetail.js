import { DETAIL_BUTTON_INFORMATION } from '../constants/filter';
import Button from './Button';
import RestaurantComponent from './Restaurant';

class RestaurantDetail {
  removeButton;
  closeButton;
  container;
  restaurant;

  constructor(restaurant) {
    this.restaurant = restaurant;
    this.createModalContainer(restaurant);
  }

  createModalContainer(restaurant) {
    const modalContainer = document.createElement('div');
    const restaurantDetailContainer = this.createRestaurantDetailContainer(restaurant);

    modalContainer.classList.add('modal-container');

    modalContainer.appendChild(restaurantDetailContainer);

    this.container = modalContainer;
  }

  createRestaurantDetailContainer(restaurant) {
    const restaurantDetailContainer = document.createElement('div');
    const restaurantInfo = this.createRestaurantInfo(restaurant);
    const buttonContainer = this.createButtonContainer();

    restaurantDetailContainer.classList.add('restaurant__detail-container');

    restaurantDetailContainer.appendChild(restaurantInfo);
    restaurantDetailContainer.appendChild(buttonContainer);

    return restaurantDetailContainer;
  }

  createRestaurantInfo(restaurant) {
    const restaurantInfo = document.createElement('div');
    const imgContainer = this.createImgContainer(restaurant);

    restaurantInfo.classList.add('restaurant__detail-info');

    restaurantInfo.appendChild(imgContainer);
    restaurantInfo.appendChild(RestaurantComponent.createRestaurantName(restaurant.information));
    restaurantInfo.appendChild(RestaurantComponent.createRestaurantDistance(restaurant.information));
    restaurantInfo.appendChild(RestaurantComponent.createRestaurantDescription(restaurant.information));
    restaurantInfo.appendChild(RestaurantComponent.createRestaurantLink(restaurant.information));

    return restaurantInfo;
  }

  createImgContainer(restaurant) {
    const imgContainer = document.createElement('div');

    imgContainer.classList.add('restaurant__required-info');

    imgContainer.appendChild(RestaurantComponent.createRestaurantCategory(restaurant.information));
    imgContainer.appendChild(RestaurantComponent.createFavoriteContainer(restaurant.information));

    return imgContainer;
  }

  createButtonContainer() {
    const buttonContainer = document.createElement('div');
    this.removeButton = Button.create(DETAIL_BUTTON_INFORMATION['removeButton']);
    this.closeButton = Button.create(DETAIL_BUTTON_INFORMATION['closeButton']);

    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(this.removeButton);
    buttonContainer.appendChild(this.closeButton);

    return buttonContainer;
  }
}

export default RestaurantDetail;
