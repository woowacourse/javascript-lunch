import { Category, Order, Tab } from '@res/constants/enum';
import Component from '@res/core/Component';
import { eventBus } from '@res/core/eventBus';
import IFilterOption from '@res/interfaces/IFilterOption';
import { $, all$, newState, on } from '@res/utils/domUtils';
import { selectTemplate } from './templates/select';

class FilterBar extends Component {
  #filterOption: IFilterOption;

  constructor(elem: HTMLElement) {
    super(elem);

    this.#filterOption = newState({ category: Category.All, order: Order.Name }, () => {
      eventBus.dispatch('@change-filter', { ...this.#filterOption });
    });

    this.render().setEvent().subscribe();
  }

  subscribe() {
    eventBus.subscribe('@click-tab', (tab: Tab) => {
      this.hide(tab === 'favorite');

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

  selectFilterOption({ category, order }: IFilterOption): this {
    all$<HTMLOptionElement>('#category-filter > option').forEach(($option) => {
      if ($option.innerText === category) $option.selected = true;
    });

    all$<HTMLOptionElement>('#sorting-filter > option').forEach(($option) => {
      if ($option.innerText === order) $option.selected = true;
    });

    return this;
  }

  template() {
    return `
    ${selectTemplate(
      {
        values: [
          [Category.All, Category.All],
          [Category.Korean, Category.Korean],
          [Category.Chinese, Category.Chinese],
          [Category.Japanese, Category.Japanese],
          [Category.Western, Category.Western],
          [Category.Asian, Category.Asian],
          [Category.Etc, Category.Etc],
        ],
        selectedIndex: 0,
      },
      { idName: 'category-filter', name: 'category', className: 'restaurant-filter' }
    )}

    ${selectTemplate(
      {
        values: [
          [Order.Name, Order.Name],
          [Order.Distance, Order.Distance],
        ],
        selectedIndex: 0,
      },
      { idName: 'sorting-filter', name: 'sorting', className: 'restaurant-filter' }
    )}`;
  }
}

export default FilterBar;
