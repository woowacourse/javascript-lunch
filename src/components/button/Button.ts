import Restaurant from '@/domain/Restaurant';
import type { TDistance, TCategory } from '@/types/restaurant';
import type RestaurantList from '@/domain/RestaurantList';
import type { FormElements, IButtonAttributes } from '@/types/dom';
import dom from '@/utils/dom';
import formValidator from '@/validator/formValidator';
import Component from '../core/Component';

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
    super({ $target, props });
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
      if (this.$target instanceof HTMLButtonElement) $addButton.disabled = true;
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
