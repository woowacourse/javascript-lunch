import './Button.css';

import type RestaurantList from '@/domain/RestaurantList';
import type { FormElements, IButtonAttributes } from '@/types/dom';
import type { TDistance, TCategory, TFormValidRestaurant } from '@/types/restaurant';

import Component from '../core/Component';

import Restaurant from '@/domain/Restaurant';
import dom from '@/utils/dom';

interface IButtonProps {
  attributes: IButtonAttributes;
  kind: 'close' | 'add' | 'delete';
  handleCloseModal: () => void;
  restaurantList?: RestaurantList;
  handleDeleteRestaurant?: (id: string) => void;
}

class Button extends Component<IButtonProps> {
  render() {
    const { id, classNames, type, text } = this.props.attributes;
    const buttonTag = dom.createButtonTag({ id, classNames, type, text });
    this.$target.appendChild(buttonTag);
    this.$target = buttonTag;
  }

  setEvent() {
    const { kind, handleCloseModal, handleDeleteRestaurant } = this.props;
    const $form = dom.getElement('form');
    const $detailFavoriteContainer = dom.getElement('#detail-favorite-container');

    if (kind === 'add') {
      $form.addEventListener('submit', e => {
        this.handleSubmitRestaurant(e);
      });
    } else if (kind === 'close') {
      this.$target.addEventListener('click', handleCloseModal.bind(this));
    } else if (kind === 'delete') {
      this.$target.addEventListener('click', () => {
        const $button = dom.getTargetElement($detailFavoriteContainer, 'button');
        handleDeleteRestaurant && handleDeleteRestaurant($button.id);
      });
    }
  }

  handleSubmitRestaurant(e: SubmitEvent) {
    e.preventDefault();
    const $form = e.target as HTMLFormElement;
    const restaurantInformation = this.getRestaurantFormData($form);
    if (restaurantInformation === undefined) return;
    if (this.props.restaurantList === undefined) return;

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

    return this.createNewRestaurant({ category, name, distance, description, referenceLink });
  }

  createNewRestaurant(information: TFormValidRestaurant) {
    const { category, name, distance, description, referenceLink } = information;

    if (this.props.restaurantList === undefined) return;

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

  dispatchSelectEvent() {
    const $categoryFilter = dom.getElement('#category-filter');
    const filterEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    });
    $categoryFilter.dispatchEvent(filterEvent);
  }
}

export default Button;
