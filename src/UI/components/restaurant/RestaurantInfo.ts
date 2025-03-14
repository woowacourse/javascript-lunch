class RestaurantInfo {
  private element: HTMLDivElement;

  constructor(name: string, distance: string, description: string) {
    this.element = this.#createRestaurantInfo(name, distance, description);
  }

  #createRestaurantInfo(name: string, distance: string, description: string): HTMLDivElement {
    const restaurantInfo = document.createElement('div');
    restaurantInfo.classList.add('restaurant__info');

    const restaurantName = document.createElement('h3');
    restaurantName.classList.add('restaurant__name', 'text-subtitle');
    restaurantName.textContent = name;

    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__distance', 'text-body');
    restaurantDistance.textContent = `캠퍼스부터 ${distance}분 내`;

    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('restaurant__description', 'text-body');
    restaurantDescription.textContent = description;

    restaurantInfo.appendChild(restaurantName);
    restaurantInfo.appendChild(restaurantDistance);
    restaurantInfo.appendChild(restaurantDescription);
    return restaurantInfo;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default RestaurantInfo;
