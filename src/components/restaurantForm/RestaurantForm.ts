import './RestaurantForm.css';
import type RestaurantList from '@/domain/RestaurantList';
import type { FormElements, IFormInput } from '@/types/dom';
import type { TCategory, TDistance, TFormValidRestaurant } from '@/types/restaurant';

import Button from '../button/Button';
import Component from '../core/Component';
import Dropdown from '../dropdown/Dropdown';

import { ADD_BUTTON_ATTRIBUTE, CLOSE_BUTTON_ATTRIBUTE } from '@/constants/button';
import { FORM_CATEGORY, FORM_CATEGORY_ATTRIBUTE, FORM_DISTANCE, FORM_DISTANCE_ATTRIBUTE } from '@/constants/filter';
import Restaurant from '@/domain/Restaurant';
import dom from '@/utils/dom';
import formValidator from '@/validator/formValidator';

interface IRestaurantFormProps {
  restaurantList: RestaurantList;
  handleResetModal: () => void;
}

class RestaurantForm extends Component<IRestaurantFormProps> {
  template() {
    return /* html */ `
    <form>
      <!-- 카테고리 -->
      <div id="category-container" class="form-item form-item--required">
        <label for="category text-caption">카테고리</label>
      </div>

      <!-- 음식점 이름 -->
      <div class="form-item form-item--required">
        <label for="name text-caption">이름</label>
        <input type="text" name="name" id="name" required />
      </div>

      <!-- 거리 -->
      <div id="distance-container" class="form-item form-item--required">
        <label for="distance text-caption">거리(도보 이동 시간) </label>
      </div>

      <!-- 설명 -->
      <div class="form-item">
        <label for="description text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>

      <!-- 링크 -->
      <div class="form-item">
        <label for="link text-caption">참고 링크</label>
        <input type="text" name="link" id="link" placeholder="https://github.com/rbgksqkr" />
        <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
        <span id="error-link" class="text-caption error-text hidden">http:// 또는 https:// 로 시작해야 합니다.</span>
      </div>

      <!-- 취소/추가 버튼 -->
      <div class="button-container"></div>
  </form>`;
  }

  render() {
    this.$target.innerHTML += this.template();
    this.$target = dom.getTargetElement(this.$target, 'form');
    this.createModalFormSelect();
    this.createModalFormButton(this.props.restaurantList);
  }

  setEvent() {
    const restaurantInputs = this.getFormInputTag();
    this.$target.addEventListener('input', () => {
      this.handleFormInput(restaurantInputs);
    });
  }

  createModalFormSelect() {
    this.createCategoryDropdown();
    this.createDistanceDropdown();
  }

  createModalFormButton(restaurantList: RestaurantList) {
    const $buttonContainer = dom.getElement('.button-container');
    this.createModalCloseButton($buttonContainer);
    this.createModalAddButton($buttonContainer, restaurantList);
  }

  createCategoryDropdown() {
    const $categoryContainer = dom.getElement('#category-container');

    new Dropdown({
      $target: $categoryContainer,
      props: {
        attributes: FORM_CATEGORY_ATTRIBUTE,
        options: FORM_CATEGORY,
      },
    });
  }

  createDistanceDropdown() {
    const $distanceContainer = dom.getElement('#distance-container');

    new Dropdown({
      $target: $distanceContainer,
      props: {
        attributes: FORM_DISTANCE_ATTRIBUTE,
        options: FORM_DISTANCE,
      },
    });
  }

  createModalCloseButton($buttonContainer: HTMLElement) {
    new Button($buttonContainer, {
      kind: 'close',
      attributes: CLOSE_BUTTON_ATTRIBUTE,
      handleCloseModal: this.props.handleResetModal,
    });
  }

  createModalAddButton($buttonContainer: HTMLElement, restaurantList: RestaurantList) {
    new Button($buttonContainer, {
      kind: 'add',
      attributes: ADD_BUTTON_ATTRIBUTE,
      restaurantList,
      handleCloseModal: this.props.handleResetModal,
      handleSubmitRestaurant: (e: SubmitEvent) => {
        this.handleSubmitRestaurant(e);
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

  handleSubmitRestaurant(e: SubmitEvent) {
    e.preventDefault();
    const $form = e.target as HTMLFormElement;
    const restaurantInformation = this.getRestaurantFormData($form);
    if (restaurantInformation === undefined) return;
    if (this.props.restaurantList === undefined) return;

    this.props.restaurantList.add(restaurantInformation);
    this.dispatchSelectEvent();
    this.props.handleResetModal();
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

export default RestaurantForm;
