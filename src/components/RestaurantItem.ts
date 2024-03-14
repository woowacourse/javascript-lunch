import { FAVORITE_STAR, NOT_FAVORITE_STAR } from '@/constants/config';
import { CATEGORY_IMG_SRC } from '../constants/filter';
import type { IRestaurant } from '../types/restaurant';
import dom from '../utils/dom';
import Component from './core/Component';

interface IRestaurantItem {
  $target: HTMLElement;
  props: IRestaurantProps;
}
interface IRestaurantProps {
  information: IRestaurant;
  handleClickFavorite?: (key: string) => void;
}

class RestaurantItem extends Component<IRestaurantProps> {
  constructor({ $target, props }: IRestaurantItem) {
    super($target, props);
  }

  render(): void {
    const categoryWrapper = this.getRestaurantCategory();
    const restaurantInfoWrapper = this.getRestaurantInfo();

    const restaurantWrapper = dom.create({
      tagName: 'li',
      classNames: ['restaurant'],
      children: [categoryWrapper, restaurantInfoWrapper],
    });
    this.$target.appendChild(restaurantWrapper);
  }

  setEvent() {
    const key = this.props.information.id;
    dom.getElement(`#favorite_${key}`).addEventListener('click', () => {
      this.props.handleClickFavorite != null && this.props.handleClickFavorite(key);
    });
  }

  getRestaurantCategory(): HTMLElement {
    const restaurantImage = this.getRestaurantImage();
    const categoryWrapper = dom.create({
      tagName: 'div',
      classNames: ['restaurant__category'],
      children: [restaurantImage],
    });
    return categoryWrapper;
  }

  getRestaurantInfo(): HTMLElement {
    const subtitle = this.getRestaurantSubtitle();
    const distance = this.getRestaurantDistance();
    const description = this.getRestaurantDescription();
    const textInfoWrapper = dom.create({ tagName: 'div', children: [subtitle, distance, description] });

    const favoriteButton = this.getFavoriteButton();
    const restaurantInfoWrapper = dom.create({
      tagName: 'div',
      classNames: ['restaurant__info__wrapper'],
      children: [textInfoWrapper, favoriteButton],
    });
    return restaurantInfoWrapper;
  }

  getRestaurantImage(): HTMLImageElement {
    const imageTag = dom.createImageTag({
      classNames: ['category-icon'],
      src: CATEGORY_IMG_SRC[this.props.information.category],
      alt: this.props.information.category,
    });
    return imageTag;
  }

  getRestaurantSubtitle(): HTMLHeadElement {
    const thirdHeaderTag = dom.create({
      tagName: 'h3',
      classNames: ['restaurant__name', 'text-subtitle'],
      text: this.props.information.name,
    });
    return thirdHeaderTag;
  }

  getRestaurantDistance(): HTMLSpanElement {
    const spanTag = dom.create({
      tagName: 'span',
      classNames: ['restaurant__distance', 'text-body'],
      text: `캠퍼스부터 ${this.props.information.distance}분 내`,
    });
    return spanTag;
  }

  getRestaurantDescription(): HTMLElement {
    const paragraphTag = dom.create({
      tagName: 'p',
      classNames: ['restaurant__description', 'text-body'],
      text: this.props.information.description,
    });
    return paragraphTag;
  }

  getFavoriteButton() {
    const key = this.props.information.id;
    const favoriteButtonTag = dom.create({
      tagName: 'button',
      id: `favorite_${key}`,
      classNames: ['favorite'],
      text: this.props.information.isFavorite ? FAVORITE_STAR : NOT_FAVORITE_STAR,
    });
    return favoriteButtonTag;
  }
}

export default RestaurantItem;
