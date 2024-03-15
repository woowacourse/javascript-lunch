import { RestaurantDataType } from '../../../type/restaurantDataType';
import './RestaurantInfoContainer.css';

export default class RestaurantInfoContainer {
  private restaurantData: RestaurantDataType;

  constructor(restaurantData: RestaurantDataType) {
    this.restaurantData = restaurantData;
  }

  render() {
    const container = document.createElement('div');
    container.classList.add('restaurant__info');

    container.appendChild(this.createRestaurantTitle());
    container.appendChild(this.createRestaurantDistance());
    container.appendChild(this.createRestaurantDescription());

    return container;
  }

  private createRestaurantTitle() {
    const title = document.createElement('h3');
    title.classList.add('restaurant__name', 'text-subtitle');
    title.textContent = this.restaurantData.name;
    return title;
  }

  private createRestaurantDistance() {
    const distance = document.createElement('span');
    distance.classList.add('restaurant__distance', 'text-body');
    distance.textContent = `캠퍼스부터 ${this.restaurantData.distanceByWalk}분 내`;
    return distance;
  }

  private createRestaurantDescription() {
    const description = document.createElement('p');
    description.classList.add('restaurant__description', 'text-body');
    description.textContent = this.restaurantData.description ?? '';
    return description;
  }
}
