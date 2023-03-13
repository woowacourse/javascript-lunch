import type { Component } from '../../interface';
import type { Restaurant } from '../../type';
import { getNewId, postRestaurant } from '../../utils/api';
import {
  CATEGORIES,
  DEFAULT_CATEGORY,
  DEFAULT_DISTANCE,
  OPTION_START_INDEX,
} from '../../utils/constants';
import category from './template/category';
import description from './template/description';
import distance from './template/distance';
import link from './template/link';
import name from './template/name';
import FormItem from '../../components/FormItem';

type AddRestaurantDrawerState = {
  restaurantForm: Restaurant;
  onToggleAddRestaurantDrawer: () => void;
};

type AddRestaurantDrawerProps = {
  $parent: HTMLElement;
  onToggleAddRestaurantDrawer: () => void;
};

export default class AddRestaurantDrawer implements Component<AddRestaurantDrawerState> {
  $target: HTMLElement;
  state: AddRestaurantDrawerState;

  constructor({ $parent, onToggleAddRestaurantDrawer }: AddRestaurantDrawerProps) {
    this.$target = document.createElement('div');
    this.$target.classList.add('modal');
    this.$target.classList.add('modal--open');

    this.state = {
      restaurantForm: {
        id: 0,
        name: '',
        category: DEFAULT_CATEGORY,
        distance: DEFAULT_DISTANCE,
        isFavorite: false,
      },
      onToggleAddRestaurantDrawer,
    };

    $parent.append(this.$target);
    this.render();
  }

  private addEvent() {
    const $cancelButton = this.$target.querySelector('#modal-cancel');
    const $modalForm = this.$target.querySelector('#modal-form') as HTMLElement;

    $cancelButton?.addEventListener('click', this.state.onToggleAddRestaurantDrawer);
    $modalForm?.addEventListener('submit', this.onSubmitForm.bind(this));
  }

  public getTemplate() {
    return `
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id="modal-form">
        <!-- 카테고리 -->
        ${new FormItem(category(), true).getTemplate()}
        <!-- 음식점 이름 -->
        ${new FormItem(name(), true).getTemplate()}
        <!-- 거리 -->
        ${new FormItem(distance(), true).getTemplate()}
        <!-- 설명 -->
        ${new FormItem(description(), false).getTemplate()}
        <!-- 링크 -->
        ${new FormItem(link(), false).getTemplate()}

        <!-- 취소/추가 버튼 -->
        <div class="button-container">
          <button type="button" id="modal-cancel" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
  `;
  }

  public render() {
    this.$target.innerHTML = this.getTemplate();

    this.addEvent();
  }

  private onSubmitForm(e: SubmitEvent) {
    e.preventDefault();

    postRestaurant(this.getFormValues(e.currentTarget as HTMLFormElement));

    this.state.onToggleAddRestaurantDrawer();
  }

  private getFormValues(form: HTMLFormElement) {
    const id = getNewId();
    const $category = form.category;
    const $name = form.querySelector('#name') as HTMLInputElement;
    const $distance = form.distance;
    const $description = form.description;
    const $link = form.link;

    return {
      id,
      category: $category?.options[$category.selectedIndex].value,
      name: $name.value,
      distance: $distance.options[$distance.selectedIndex].value,
      description: $description.value ?? '',
      link: $link.value ?? '',
      isFavorite: false,
    };
  }
}
