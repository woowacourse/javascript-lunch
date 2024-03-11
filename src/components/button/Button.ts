import Restaurant from '@/domain/Restaurant';
import type { TCategory, TDistance } from '@/types/restaurant';
import type RestaurantList from '@/domain/RestaurantList';
import type { IButtonAttributes } from '../../types/dom';
import dom from '../../utils/dom';

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
}

class Button {
  $target;
  attributes;
  kind;
  restaurantList;

  constructor({ $target, attributes, kind, restaurantList }: IButtonProps) {
    this.$target = $target;
    this.attributes = attributes;
    this.kind = kind;
    this.restaurantList = restaurantList;
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
    const restaurantInformation = this.getRestaurantFormData();
    if (restaurantInformation === undefined) return;
    if (this.restaurantList == null) return;
    this.restaurantList.add(restaurantInformation);
    this.dispatchSelectEvent();
    this.close();
  }

  getRestaurantFormData(): Restaurant | undefined {
    const $restaurantForm = dom.getElement('form') as HTMLFormElement;
    const elements = $restaurantForm.elements as FormElements;

    const category = elements.category.value as TCategory;
    const name = elements.name.value;
    const distance = Number(elements.distance.value) as TDistance;
    const description = elements.description.value;
    const referenceLink = elements.link.value;

    if (category == null) return;
    if (name == null) return;
    if (distance == null) return;
    if (referenceLink !== '' && !(referenceLink.startsWith('http://') || referenceLink.startsWith('https://'))) return;

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
