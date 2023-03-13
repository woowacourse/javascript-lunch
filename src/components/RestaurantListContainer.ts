import { Category, Order, Tab } from '../constants/enum';
import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import { toggleFavoriteIcon } from '../images/imageByCategory';
import FilterOption from '../interfaces/FilterOption';
import RenderOptions from '../interfaces/RenderOptions';
import { Restaurant } from '../interfaces/RestaurantInput';
import { restaurantStore } from '../model/restaurantStore';
import { $, all$, newState, on } from '../utils/domUtils';
import listTemplate from './templates/restaurantListTemplate';

class RestaurantListContainer extends Component {
  #state: {
    renderOptions: RenderOptions;
  };

  constructor(elem: HTMLElement) {
    super(elem);

    this.#state = newState(
      {
        renderOptions: {
          category: Category.All,
          order: Order.Name,
          tab: Tab.All,
        },
      },
      this.render.bind(this)
    );

    this.render().subscribe().setEvent();
  }

  subscribe(): this {
    eventBus
      .subscribe('@add-restaurant', this.render.bind(this))
      .subscribe('@change-filter', this.handleFilter.bind(this))
      .subscribe('@click-tab', this.handleTabChange.bind(this))
      .subscribe('@toggle-favorite', this.render.bind(this));

    return this;
  }

  isTarget(elem: HTMLElement, id: number): boolean {
    return Number(elem.dataset.id) === id;
  }

  toggleFavorite(imageElement: HTMLImageElement) {
    imageElement.classList.toggle('favorite');
    toggleFavoriteIcon(imageElement);
  }

  setEvent() {
    on({
      target: this.$target,
      eventName: 'click',
      handler: this.handleClickRestaurant.bind(this),
    });

    return this;
  }

  handleClickRestaurant(event: Event): void {
    const $eventTarget = event.target;

    if (!($eventTarget instanceof HTMLElement)) {
      return;
    }

    const $li = $eventTarget.closest('li');

    if ($li === null) {
      return;
    }

    const id = Number($li.dataset.id);

    this.isClickFavorite($eventTarget) ? this.handleClickFavorite(id) : this.handleClickBody(id);
  }

  handleClickFavorite(id: number): void {
    restaurantStore.toggleFavorite(id);

    this.render();

    if (this.#state.renderOptions.tab === Tab.Favorite) {
      eventBus.dispatch('@remove-favorite', id);
    }
  }

  handleClickBody(id: number): void {
    eventBus.dispatch('@close-detail-modal', id, restaurantStore.getItemById);
  }

  isClickFavorite(element: HTMLElement): boolean {
    return element.classList.contains('favorite-icon');
  }

  handleTabChange(tab: Tab): void {
    this.#state.renderOptions = { ...this.#state.renderOptions, tab };
  }

  handleFilter({ category, order }: FilterOption): void {
    this.#state.renderOptions = { ...this.#state.renderOptions, category, order };
  }

  render() {
    const restaurantList = restaurantStore.getList({ ...this.#state.renderOptions });

    this.$target.innerHTML = this.template(restaurantList);

    return this;
  }

  template(restaurantList: Restaurant[]): string {
    return `<ul class="restaurant-list">
      ${listTemplate([...restaurantList])}
    </ul>`;
  }
}

export default RestaurantListContainer;
