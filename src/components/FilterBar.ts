import { Category, Order, Tab } from '../constants/enum';
import { categorySelectionsList, orderSelectionsList } from '../constants/listForSelection';
import Component from '../core/Component';
import { eventBus } from '../core/eventBus';
import FilterOption from '../interfaces/FilterOption';
import { $, all$, newState, on } from '../utils/domUtils';
import { selectTemplate } from './templates/select';

class FilterBar extends Component {
  #filterOption: FilterOption;

  constructor(elem: HTMLElement) {
    super(elem);

    this.#filterOption = newState({ category: Category.All, order: Order.Name }, () => {
      eventBus.dispatch('@change-filter', { ...this.#filterOption });
    });

    this.render().setEvent().subscribe();
  }

  subscribe() {
    eventBus.subscribe('@click-tab', (tab: Tab) => {
      this.hide(tab === Tab.Favorite);

      eventBus.dispatch('@reload-filter', { ...this.#filterOption, tab });
    });

    return this;
  }

  setEvent() {
    const $categoryFilter = $<HTMLSelectElement>('#category-filter');
    const $sortingFilter = $<HTMLSelectElement>('#sorting-filter');

    on({
      target: $categoryFilter,
      eventName: 'change',
      handler: () => {
        this.#filterOption.category = $categoryFilter.value as Category;
      },
    });

    on({
      target: $sortingFilter,
      eventName: 'change',
      handler: () => {
        this.#filterOption.order = $sortingFilter.value as Order;
      },
    });

    return this;
  }

  selectFilterOption({ category, order }: FilterOption): this {
    all$<HTMLOptionElement>('#category-filter > option').forEach(($option) => {
      if ($option.value === category) $option.selected = true;
    });

    all$<HTMLOptionElement>('#sorting-filter > option').forEach(($option) => {
      if ($option.value === order) $option.selected = true;
    });

    return this;
  }

  template() {
    return `
    ${selectTemplate(
      {
        values: categorySelectionsList,
        selectedIndex: 0,
      },
      { idName: 'category-filter', name: 'category', className: 'restaurant-filter' }
    )}

    ${selectTemplate(
      {
        values: orderSelectionsList,
        selectedIndex: 0,
      },
      { idName: 'sorting-filter', name: 'sorting', className: 'restaurant-filter' }
    )}`;
  }
}

export default FilterBar;
