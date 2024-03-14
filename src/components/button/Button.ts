import './Button.css';

import type RestaurantList from '@/domain/RestaurantList';
import type { FormElements, IButtonAttributes } from '@/types/dom';
import type { TDistance, TCategory } from '@/types/restaurant';

import Component from '../core/Component';

import Restaurant from '@/domain/Restaurant';
import dom from '@/utils/dom';

interface IButtonProps {
  attributes: IButtonAttributes;
  kind: 'close' | 'add';
  restaurantList?: RestaurantList;
  handleCloseModal: () => void;
}

interface IButton {
  $target: HTMLElement;
  props: IButtonProps;
}

class Button extends Component<IButtonProps> {
  constructor({ $target, props }: IButton) {
    super($target, props);
  }

  setEvent(): void {
    if (this.props.kind === 'add') {
      dom.getElement('form').addEventListener('submit', e => {
        e.preventDefault();
        const $form = e.target as HTMLFormElement;
        this.handleAddRestaurant($form);
      });
    } else if (this.props.kind === 'close') {
      this.$target.addEventListener('click', this.props.handleCloseModal.bind(this));
    }
  }

  render(): void {
    const { id, classNames, type, text } = this.props.attributes;
    const buttonTag = dom.createButtonTag({ id, classNames, type, text });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  handleAddRestaurant($form: HTMLFormElement): void {
    const restaurantInformation = this.getRestaurantFormData($form);
    if (restaurantInformation === undefined) return;
    if (this.props.restaurantList == null) return;
    this.props.restaurantList.add(restaurantInformation);
    this.dispatchSelectEvent();
    this.props.handleCloseModal();
  }

  getRestaurantFormData($restaurantForm: HTMLFormElement) {
    const elements = $restaurantForm.elements as FormElements;

    const category = elements.category.value as TCategory;
    const name = elements.name.value;
    const distance = Number(elements.distance.value) as TDistance;
    const description = elements.description.value;
    const referenceLink = elements.link.value;

    if (this.props.restaurantList != null) {
      const nextId = this.props.restaurantList.getRestaurantListLength().toString();
      return new Restaurant({
        id: nextId,
        category,
        name,
        distance,
        isFavorite: false,
        description,
        referenceLink,
      });
    }
  }

  dispatchSelectEvent(): void {
    const $categoryContainer = dom.getElement('#category-filter');
    const filterEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $categoryContainer.dispatchEvent(filterEvent);
  }
}

export default Button;
