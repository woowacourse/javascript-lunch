import { Category, Order } from '@res/constants/enum';
import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import { ImageByCategory, FavoriteImage, toggleFavoriteIcon } from '@res/images/imageByCategory';
import IFilterOption from '@res/interfaces/IFilterOption';
import IRenderOptions from '@res/interfaces/IRenderOptions';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { TabToggle } from '@res/interfaces/types';
import { restaurantStore } from '@res/model/restaurantStore';
import { all$, $, newState, on } from '@res/utils/domUtils';

class ListContainer extends Component {
  #state: {
    renderOptions: IRenderOptions;
  };

  constructor(elem: HTMLElement) {
    super(elem);

    this.#state = newState(
      {
        renderOptions: {
          category: Category.All,
          order: Order.Name,
          tab: 'all',
        },
      },
      this.render.bind(this)
    );

    this.render().subscribe().setEvent();
  }

  subscribe(): this {
    eventBus
      .subscribe('@add-restaurant', this.handleAdd.bind(this))
      .subscribe('@change-filter', this.handleFilter.bind(this))
      .subscribe('@click-tab', this.handleTabChange.bind(this))
      .subscribe('@toggle-favorite', this.handleToggleFavorite.bind(this));

    return this;
  }

  handleToggleFavorite(id: number) {
    all$('li', this.$target).forEach((elem) => {
      if (!this.isTarget(elem, id)) return;

      this.toggleFavorite($<HTMLImageElement>('.favorite-icon', elem));
    });
  }

  isTarget(elem: HTMLElement, id: number): boolean {
    return Number(elem.dataset.id) === id;
  }

  toggleFavorite(imageElement: HTMLImageElement) {
    imageElement.classList.toggle('favorite');
    toggleFavoriteIcon(imageElement);
  }

  setEvent() {
    on(this.$target, 'click', this.handleClickRestaurant.bind(this));

    return this;
  }

  handleClickRestaurant(event: Event): void {
    const $eventTarget = event.target as HTMLElement;
    const id = Number($eventTarget.closest('li')!.dataset.id);

    this.isClickFavorite($eventTarget)
      ? this.handleClickFavorite($eventTarget, id)
      : this.handleClickBody(id);
  }

  handleClickFavorite(element: HTMLElement, id: number): void {
    this.toggleFavorite(element as HTMLImageElement);
    restaurantStore.toggleFavorite(id);
  }

  handleClickBody(id: number): void {
    eventBus.dispatch('@click-detail', id, restaurantStore.getItemById);
  }

  isClickFavorite(element: HTMLElement): boolean {
    return element.classList.contains('favorite-icon');
  }

  handleTabChange(tab: TabToggle): void {
    console.log(tab);
    this.#state.renderOptions = { ...this.#state.renderOptions, tab };
  }

  // TODO: add 시에 아무 데이터 안넘겨 줘도 됨.
  handleAdd(): void {
    this.render();
  }

  handleFilter({ category, order }: IFilterOption): void {
    this.#state.renderOptions = { ...this.#state.renderOptions, category, order };
  }

  render() {
    const restaurantList = restaurantStore.getList({ ...this.#state.renderOptions });
    this.$target.innerHTML = this.template(restaurantList);

    console.log(this.#state.renderOptions, 'renderOptions');

    return this;
  }

  template(restaurantList: IRestaurant[]): string {
    return `<ul class="restaurant-list">
      ${this.listTemplate([...restaurantList])}
    </ul>`;
  }

  listTemplate(restaurantList: IRestaurant[]): string {
    return restaurantList.map(this.handleCreateList.bind(this)).join('');
  }

  handleCreateList({ id, category, name, distance, description, favorite }: IRestaurant) {
    // FIXME: component 만들기 img (음식 사진, 즐겨찾기 )
    return `
    <li data-id = ${id} class="restaurant">
      <div class="restaurant__category">
        ${this.categoryImageTemplate(category)}
      </div>
      <div class="restaurant__info">
        ${this.titleTemplate(name)}
        ${Number(distance) !== 0 ? this.distanceTemplate(distance) : ''}
        ${this.descriptionTemplate(description)}
      </div>
      <div class="restaurant__favorite"> 
        ${this.favoriteImageTemplate(favorite)}
      </div>
    </li>`;
  }

  favoriteImageTemplate(favorite: boolean) {
    return `<img src=${
      favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff
    } alt='즐겨찾기' class="favorite-icon ${favorite ? 'favorite' : ''}"/>`;
  }

  categoryImageTemplate(category: string): string {
    return `<img src=${ImageByCategory[category]} alt=${category} class="category-icon"/>`;
  }

  titleTemplate(name: string): string {
    return `<h3 class="restaurant__name text-subtitle">${name}</h3>`;
  }

  distanceTemplate(distance: string): string {
    return `<span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>`;
  }

  descriptionTemplate(description: string): string {
    return `<p class="restaurant__description text-body">${description}</p>`;
  }
}

export default ListContainer;
