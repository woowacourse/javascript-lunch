import Restaurant from '@/domain/Restaurant';
import type { IRestaurantList, TCategory, TDistance } from '@/types/restaurant';
import type RestaurantList from '@/domain/RestaurantList';
import type { IButtonAttributes } from '../types/dom';
import dom from '../utils/dom';

interface FormElements extends HTMLFormControlsCollection {
  category: HTMLInputElement;
  name: HTMLInputElement;
  distance: HTMLInputElement;
  description: HTMLInputElement;
  link: HTMLInputElement;
}

interface IButtonProps {
  $target: HTMLElement;
  attributes: IButtonAttributes;
  kind: 'close' | 'add';
  restaurantList?: RestaurantList;
  renderNewRestaurantList?: (newRestaurants: IRestaurantList) => void;
}

class Button {
  $target;
  attributes;
  kind;
  restaurantList;
  renderNewRestaurantList;

  constructor({ $target, attributes, kind, restaurantList, renderNewRestaurantList }: IButtonProps) {
    this.$target = $target;
    this.attributes = attributes;
    this.kind = kind;
    this.restaurantList = restaurantList;
    this.renderNewRestaurantList = renderNewRestaurantList;
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    if (this.kind === 'add') {
      dom.getElement('form').addEventListener('submit', e => {
        e.preventDefault();
        this.handleAddRestaurant();
      });
    } else if (this.kind === 'close') {
      this.$target.addEventListener('click', () => {
        this.close();
      });
    }
  }

  render(): void {
    const { name, id, classNames, type, text } = this.attributes;
    const buttonTag = dom.createButtonTag({ name, id, classNames, type, text });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  close(): void {
    dom.getElement('.modal').classList.remove('modal--open');
    const $form = dom.getElement('form') as HTMLFormElement;
    $form.reset();
  }

  handleAddRestaurant(): void {
    const $restaurantForm = dom.getElement('form') as HTMLFormElement;
    const elements = $restaurantForm.elements as FormElements;

    const category = elements.category.value as TCategory;
    const name = elements.name.value;
    const distance = Number(elements.distance.value) as TDistance;
    const description = elements.description.value;
    const referenceLink = elements.link.value;
    const restaurantInformation = new Restaurant({ category, name, distance, description, referenceLink });

    if (this.restaurantList == null) return;
    this.restaurantList.add(restaurantInformation);
    this.renderNewRestaurantList != null && this.renderNewRestaurantList(this.restaurantList.restaurants);
    this.close();
  }
}

export default Button;
