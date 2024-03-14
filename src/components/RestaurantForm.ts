import type RestaurantList from '@/domain/RestaurantList';
import type { IFormInput } from '@/types/dom';
import type { TCategory, TDistance } from '@/types/restaurant';

import Button from './button/Button';
import Component from './core/Component';
import Dropdown from './Dropdown';

import {
  ADD_BUTTON_ATTRIBUTE,
  CLOSE_BUTTON_ATTRIBUTE,
  FORM_CATEGORY,
  FORM_CATEGORY_ATTRIBUTE,
  FORM_DISTANCE,
  FORM_DISTANCE_ATTRIBUTE,
} from '@/constants/filter';
import dom from '@/utils/dom';
import formValidator from '@/validator/formValidator';

interface IRestaurantForm {
  $target: HTMLElement;
  props: IRestaurantFormProps;
}

interface IRestaurantFormProps {
  restaurantList: RestaurantList;
  handleCloseModal: () => void;
}

class RestaurantForm extends Component<IRestaurantFormProps> {
  constructor({ $target, props }: IRestaurantForm) {
    super($target, props);
  }

  render() {
    this.createModalFormSelect(this.props.restaurantList);
    this.createModalFormButton(this.props.restaurantList);
  }

  setEvent() {
    const { category, name, distance, link, $addButton } = this.getFormInputTag();
    this.$target.addEventListener('input', () => {
      this.handleFormInput({ category, name, distance, link, $addButton });
    });
  }

  createCategoryDropdown(restaurantList: RestaurantList) {
    const $categoryContainer = dom.getElement('#category-container');

    new Dropdown({
      $target: $categoryContainer,
      props: {
        attributes: FORM_CATEGORY_ATTRIBUTE,
        options: FORM_CATEGORY,
        restaurantList,
      },
    });
  }

  createDistanceDropdown(restaurantList: RestaurantList) {
    const $distanceContainer = dom.getElement('#distance-container');
    new Dropdown({
      $target: $distanceContainer,
      props: {
        attributes: FORM_DISTANCE_ATTRIBUTE,
        options: FORM_DISTANCE,
        restaurantList,
      },
    });
  }

  createModalFormSelect(restaurantList: RestaurantList) {
    this.createCategoryDropdown(restaurantList);
    this.createDistanceDropdown(restaurantList);
  }

  createModalFormButton(restaurantList: RestaurantList) {
    const $buttonContainer = dom.getElement('.button-container');

    new Button({
      $target: $buttonContainer,
      props: {
        kind: 'close',
        attributes: CLOSE_BUTTON_ATTRIBUTE,
        handleCloseModal: this.props.handleCloseModal,
      },
    });

    new Button({
      $target: $buttonContainer,
      props: {
        kind: 'add',
        attributes: ADD_BUTTON_ATTRIBUTE,
        restaurantList,
        handleCloseModal: this.props.handleCloseModal,
      },
    });
  }

  getFormInputTag(): IFormInput {
    const category = dom.getElement('#category') as HTMLInputElement;
    const name = dom.getElement('#name') as HTMLInputElement;
    const distance = dom.getElement('#distance') as HTMLInputElement;
    const link = dom.getElement('#link') as HTMLInputElement;
    const $addButton = dom.getElement('#button-add') as HTMLButtonElement;
    return { category, name, distance, link, $addButton };
  }

  handleFormInput = ({
    category: $category,
    name: $name,
    distance: $distance,
    link: $link,
    $addButton,
  }: IFormInput) => {
    const category = $category.value as TCategory;
    const name = $name.value;
    const distance = $distance.value as unknown as TDistance;
    const referenceLink = $link.value;

    if (formValidator.isValidForm({ category, name, distance, referenceLink })) $addButton.disabled = false;
    else $addButton.disabled = true;
  };
}

export default RestaurantForm;
