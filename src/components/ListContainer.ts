import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import ImageByCategory from '@res/images/imageByCategory';
import IFilterOption from '@res/interfaces/IFilterOption';
import IRestaurantInput from '@res/interfaces/IRestaurantInput';
import { restaurantStore } from '@res/model/restaurantStore';
import { newState } from '@res/utils/domUtils';

class ListContainer extends Component {
  #state: {
    restaurantList: IRestaurantInput[];
  };

  constructor(elem: HTMLElement) {
    super(elem);

    this.#state = newState({ restaurantList: restaurantStore.getList() }, this.render.bind(this));

    this.render().subscribe();
  }

  subscribe(): this {
    eventBus.subscribe('@add-restaurant', this.handleAdd.bind(this));
    eventBus.subscribe('@change-filter', this.handleFilter.bind(this));

    return this;
  }

  handleAdd(restaurantInput: IRestaurantInput): void {
    this.#state.restaurantList = [...this.#state.restaurantList, restaurantInput];
  }

  handleFilter({ category, order }: IFilterOption): void {
    this.#state.restaurantList = restaurantStore.getFiltered(category, order) || [];
  }

  template(): string {
    return `<ul class="restaurant-list">
      ${this.listTemplate([...this.#state.restaurantList])}
    </ul>`;
  }

  listTemplate(restaurantList: IRestaurantInput[]): string {
    return restaurantList.map(this.handleCreateList.bind(this)).join('');
  }

  handleCreateList({ category, name, distance, description }: IRestaurantInput) {
    return `
    <li class="restaurant">
      <div class="restaurant__category">
        ${this.imageTemplate(category)}
      </div>
      <div class="restaurant__info">
        ${this.titleTemplate(name)}
        ${this.distanceTemplate(Number(distance))}
        ${this.descriptionTemplate(description)}
      </div>
    </li>`;
  }

  imageTemplate(category: string): string {
    return `<img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>`;
  }

  titleTemplate(name: string): string {
    return `<h3 class="restaurant__name text-subtitle">${name}</h3>`;
  }

  distanceTemplate(distance: number): string {
    if (distance === 0) return '';
    return `<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>`;
  }

  descriptionTemplate(description: string): string {
    return `<p class="restaurant__description text-body">${description}</p>`;
  }
}

export default ListContainer;
