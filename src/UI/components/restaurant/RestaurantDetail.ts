import RestaurantIcon from './RestaurantIcon';

class RestaurantDetail {
  private element: HTMLDivElement;

  constructor(name: string, distance: string, category: string, description: string, link: string) {
    this.element = this.#createRestaurantDetail(name, distance, category, description, link);
  }

  #createRestaurantDetail(
    name: string,
    distance: string,
    category: string,
    description: string,
    link: string,
  ): HTMLDivElement {
    const restaurantDetail = document.createElement('div');
    restaurantDetail.classList.add('restaurant__detail');

    const restaurantIcon = this.#createRestaurantIcon(category);
    restaurantDetail.appendChild(restaurantIcon);

    const restaurantName = this.#createRestaurantName(name);
    restaurantDetail.appendChild(restaurantName);

    const restaurantDistance = this.#createRestaurantDistance(distance);
    restaurantDetail.appendChild(restaurantDistance);

    if (description !== '') {
      const restaurantDescription = this.#createRestaurantDescription(description);
      restaurantDetail.appendChild(restaurantDescription);
    }

    if (link !== '') {
      const restaurantLink = this.#createRestaurantLink(link);
      restaurantDetail.appendChild(restaurantLink);
    }

    return restaurantDetail;
  }

  #createRestaurantIcon(category: string): HTMLElement {
    const restaurantIcon = new RestaurantIcon(category);
    return restaurantIcon.getElement();
  }

  #createRestaurantName(name: string): HTMLHeadingElement {
    const restaurantName = document.createElement('h3');
    restaurantName.classList.add('restaurant__detail__name', 'text-subtitle');
    restaurantName.textContent = name;
    return restaurantName;
  }

  #createRestaurantDistance(distance: string): HTMLSpanElement {
    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__detail__distance', 'text-body');
    restaurantDistance.textContent = `캠퍼스부터 ${distance}분 내`;
    return restaurantDistance;
  }

  #createRestaurantDescription(description: string): HTMLParagraphElement {
    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('text-body');
    restaurantDescription.textContent = description;
    return restaurantDescription;
  }

  #createRestaurantLink(link: string): HTMLAnchorElement {
    const restaurantLink = document.createElement('a');
    restaurantLink.classList.add('restaurant__detail__link', 'text-body');
    restaurantLink.href = link;
    restaurantLink.textContent = link;
    restaurantLink.target = '_blank';
    return restaurantLink;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default RestaurantDetail;
