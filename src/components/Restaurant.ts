import { CATEGORY_IMG_SRC } from '../constants/filter';
import type { IRestaurant } from '../types/restaurant';

interface IRestaurantProps {
  $target: HTMLElement;
  information: IRestaurant;
}

class RestaurantComponent {
  $target;
  information;

  constructor({ $target, information }: IRestaurantProps) {
    this.$target = $target;
    this.information = information;
    this.render();
  }

  render(): void {
    const restaurantWrapper = document.createElement('li');
    restaurantWrapper.classList.add('restaurant');
    const categoryWrapper = this.#getRestaurantCategory();
    const infoWrapper = this.#getRestaurantInfo();
    restaurantWrapper.appendChild(categoryWrapper);
    restaurantWrapper.appendChild(infoWrapper);
    this.$target.appendChild(restaurantWrapper);
  }

  #getRestaurantCategory(): HTMLDivElement {
    const categoryWrapper = document.createElement('div');
    categoryWrapper.classList.add('restaurant__category');
    const restaurantImage = this.#getRestaurantImage();
    categoryWrapper.appendChild(restaurantImage);
    return categoryWrapper;
  }

  #getRestaurantInfo(): HTMLDivElement {
    const infoWrapper = document.createElement('div');
    const subtitle = this.#getRestaurantSubtitle();
    const distance = this.#getRestaurantDistance();
    const description = this.#getRestaurantDescription();
    infoWrapper.appendChild(subtitle);
    infoWrapper.appendChild(distance);
    infoWrapper.appendChild(description);
    return infoWrapper;
  }

  #getRestaurantImage(): HTMLImageElement {
    const imageTag = document.createElement('img');
    imageTag.src = CATEGORY_IMG_SRC[this.information.category];
    imageTag.alt = this.information.category;
    imageTag.classList.add('category-icon');
    return imageTag;
  }

  #getRestaurantSubtitle(): HTMLHeadElement {
    const thirdHeaderTag = document.createElement('h3');
    thirdHeaderTag.classList.add('restaurant__name');
    thirdHeaderTag.classList.add('text-subtitle');
    thirdHeaderTag.textContent = this.information.name;
    return thirdHeaderTag;
  }

  #getRestaurantDistance(): HTMLSpanElement {
    const spanTag = document.createElement('span');
    spanTag.classList.add('restaurant__distance');
    spanTag.classList.add('text-body');
    spanTag.textContent = `캠퍼스부터 ${this.information.distance}분 내`;
    return spanTag;
  }

  #getRestaurantDescription(): HTMLParagraphElement {
    const paragraphTag = document.createElement('p');
    paragraphTag.classList.add('restaurant__description');
    paragraphTag.classList.add('text-body');
    paragraphTag.textContent = this.information.description ?? '';
    return paragraphTag;
  }
}

export default RestaurantComponent;
