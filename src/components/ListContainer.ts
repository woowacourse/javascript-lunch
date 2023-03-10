import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import { ImageByCategory, FavoriteImage } from '@res/images/imageByCategory';
import IFilterOption from '@res/interfaces/IFilterOption';
import { IRestaurant } from '@res/interfaces/IRestaurantInput';
import { restaurantStore } from '@res/model/restaurantStore';
import { $, newState, on } from '@res/utils/domUtils';

class ListContainer extends Component {
  #state: {
    restaurantList: IRestaurant[];
  };

  constructor(elem: HTMLElement) {
    super(elem);

    this.#state = newState({ restaurantList: restaurantStore.getList() }, this.render.bind(this));

    this.render().subscribe().setEvent();
  }

  subscribe(): this {
    eventBus
      .subscribe('@add-restaurant', this.handleAdd.bind(this))
      .subscribe('@change-filter', this.handleFilter.bind(this))
      .subscribe('@reload-filter', this.handleTabChange.bind(this));

    return this;
  }

  setEvent() {
    on(this.$target, 'click', (event) => {
      const $eventTarget = event.target as HTMLElement;
      const $closestDiv = $eventTarget.closest('div')!;
      const $restaurantItem = $closestDiv.closest('li')!;
      const id = Number($closestDiv.closest('li')!.dataset.id);

      if ($closestDiv.className === 'favorite') {
        const $image = $<HTMLImageElement>('img', $closestDiv);

        if ($image.classList.contains('favorite')) {
          $image.src = FavoriteImage.favoriteOff;
          $image.classList.remove('favorite');
        } else {
          $image.src = FavoriteImage.favoriteOn;
          $image.classList.add('favorite');
        }
        restaurantStore.toggleFavorite(id);
      } else {
        console.log(restaurantStore.getItemById(id));
      }
    });

    return this;
  }

  handleTabChange(detail: any): void {
    const { category, order, tab } = detail;

    if (tab === 'all') {
      this.handleFilter({ category, order });
      return;
    }

    this.#state.restaurantList = restaurantStore.getFavoriteList();
  }

  handleAdd(restaurant: IRestaurant): void {
    this.#state.restaurantList = [...this.#state.restaurantList, restaurant];
  }

  handleFilter({ category, order }: IFilterOption): void {
    this.#state.restaurantList = restaurantStore.getFiltered(category, order) || [];
  }

  render() {
    this.$target.innerHTML = this.template();

    return this;
  }

  template(): string {
    return `<ul class="restaurant-list">
      ${this.listTemplate([...this.#state.restaurantList])}
    </ul>`;
  }

  listTemplate(restaurantList: IRestaurant[]): string {
    return restaurantList.map(this.handleCreateList.bind(this)).join('');
  }

  handleCreateList({ id, category, name, distance, description, favorite }: IRestaurant) {
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
      <div class="favorite"> 
        ${this.favoriteImageTemplate(favorite)}
      </div>
    </li>`;
  }

  favoriteImageTemplate(favorite: boolean) {
    return `<img src=${
      favorite ? FavoriteImage.favoriteOn : FavoriteImage.favoriteOff
    } alt='즐겨찾기' class="category-icon ${favorite ? 'favorite' : ''}"/>`;
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
