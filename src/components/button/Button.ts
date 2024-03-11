import Restaurant from '@/domain/Restaurant';
import type { TDistance, TCategory } from '@/types/restaurant';
import type RestaurantList from '@/domain/RestaurantList';
import type { IButtonAttributes } from '@/types/dom';
import dom from '@/utils/dom';
import formValidator from '@/validator/formValidator';

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
  handleCloseModal: () => void;
}

class Button {
  $target;
  attributes;
  kind;
  restaurantList;
  handleCloseModal;

  constructor({ $target, attributes, kind, restaurantList, handleCloseModal }: IButtonProps) {
    this.$target = $target;
    this.attributes = attributes;
    this.kind = kind;
    this.restaurantList = restaurantList;
    this.handleCloseModal = handleCloseModal;
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    if (this.kind === 'add') {
      dom.getElement('form').addEventListener('submit', e => {
        e.preventDefault();
        const $form = e.target as HTMLFormElement;
        this.handleAddRestaurant($form);
      });
    } else if (this.kind === 'close') {
      this.$target.addEventListener('click', this.handleCloseModal);
    }
  }

  render(): void {
    const { name, id, classNames, type, text } = this.attributes;
    const buttonTag = dom.createButtonTag({ name, id, classNames, type, text });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  handleAddRestaurant($form: HTMLFormElement): void {
    const restaurantInformation = this.getRestaurantFormData($form);
    if (restaurantInformation === undefined) return;
    if (this.restaurantList == null) return;
    this.restaurantList.add(restaurantInformation);
    this.dispatchSelectEvent();
    this.handleCloseModal();
  }

  getRestaurantFormData($restaurantForm: HTMLFormElement): Restaurant | undefined {
    const elements = $restaurantForm.elements as FormElements;

    const category = elements.category.value as TCategory;
    const name = elements.name.value;
    const distance = Number(elements.distance.value) as TDistance;
    const description = elements.description.value;
    const referenceLink = elements.link.value;

    const isValidForm = formValidator.isValidForm({ category, name, distance, referenceLink });
    if (!isValidForm) {
      const $addButton = dom.getElement('#button-add') as HTMLButtonElement;
      $addButton.disabled = true;
      return;
    }
    return new Restaurant({ category, name, distance, description, referenceLink });
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
