import { CATEGORY_IMG_SRC } from '../constants/filter';
import type { IRestaurant } from '../types/restaurant';
import dom from '../utils/dom';

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
    const categoryWrapper = this.#getRestaurantCategory();
    const infoWrapper = this.#getRestaurantInfo();
    const restaurantWrapper = dom.create({
      tagName: 'li',
      classNames: ['restaurant'],
      children: [categoryWrapper, infoWrapper],
    });
    this.$target.appendChild(restaurantWrapper);
  }

  #getRestaurantCategory(): HTMLElement {
    const restaurantImage = this.#getRestaurantImage();
    const categoryWrapper = dom.create({
      tagName: 'div',
      classNames: ['restaurant__category'],
      children: [restaurantImage],
    });
    return categoryWrapper;
  }

  #getRestaurantInfo(): HTMLElement {
    const subtitle = this.#getRestaurantSubtitle();
    const distance = this.#getRestaurantDistance();
    const description = this.#getRestaurantDescription();
    const infoWrapper = dom.create({ tagName: 'div', children: [subtitle, distance, description] });
    return infoWrapper;
  }

  #getRestaurantImage(): HTMLImageElement {
    const imageTag = dom.createImageTag({
      classNames: ['category-icon'],
      src: CATEGORY_IMG_SRC[this.information.category],
      alt: this.information.category,
    });
    return imageTag;
  }

  #getRestaurantSubtitle(): HTMLHeadElement {
    const thirdHeaderTag = dom.create({
      tagName: 'h3',
      classNames: ['restaurant__name', 'text-subtitle'],
      text: this.information.name,
    });
    return thirdHeaderTag;
  }

  #getRestaurantDistance(): HTMLSpanElement {
    const spanTag = dom.create({
      tagName: 'span',
      classNames: ['restaurant__distance', 'text-body'],
      text: `캠퍼스부터 ${this.information.distance}분 내`,
    });
    return spanTag;
  }

  #getRestaurantDescription(): HTMLElement {
    const paragraphTag = dom.create({
      tagName: 'p',
      classNames: ['restaurant__description', 'text-body'],
      text: this.information.description,
    });
    return paragraphTag;
  }
}

export default RestaurantComponent;
