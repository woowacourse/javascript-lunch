import type RestaurantList from '../domain/RestaurantList';
import type { ISelectAttributes, IOptionAttributes } from '../types/dom';
import type { TCategory, TSorting } from '../types/restaurant';
import dom from '../utils/dom';
import RestaurantComponent from './Restaurant';

interface ISelectBoxProps {
  $target: HTMLElement;
  attributes: ISelectAttributes;
  eventHandler: () => void;
  options: IOptionAttributes[];
  kind?: 'category' | 'sorting';
  restaurantList?: RestaurantList;
}

class SelectBoxComponent {
  kind;
  $target;
  attributes;
  eventHandler;
  options;
  restaurantList;

  constructor({ $target, attributes, eventHandler, options, kind, restaurantList }: ISelectBoxProps) {
    this.$target = $target;
    this.attributes = attributes;
    this.eventHandler = eventHandler;
    this.options = options;
    this.kind = kind;
    this.restaurantList = restaurantList;
    this.render();
    this.setEvent();
  }

  setEvent(): void {
    if (this.kind === 'category') this.$target.addEventListener('change', this.handleCategoryFilter.bind(this));
    if (this.kind === 'sorting') this.$target.addEventListener('change', this.handleSortingFilter.bind(this));
  }

  render(): void {
    const selectTag = this.#getSelectTag();
    this.options.forEach(option => {
      const optionTag = dom.createOptionTag({ value: option.value, text: option.text });
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
  }

  #getSelectTag(): HTMLSelectElement {
    const { name, id, classNames, required } = this.attributes;
    return dom.createSelectTag({ name, id, classNames, required });
  }

  handleCategoryFilter(): void {
    const $restaurantList = document.querySelector('.restaurant-list') as HTMLElement;
    const category = this.getSelectedCategory();
    const sortingCondition = this.getSelectedSortingCondition();

    if (this.restaurantList == null) return;
    this.restaurantList.filterByCategory(category);
    const sortedList = this.restaurantList.getSortedByCondition(sortingCondition);
    $restaurantList.replaceChildren();
    sortedList.forEach(element => {
      new RestaurantComponent({ $target: $restaurantList, information: element.information });
    });
  }

  handleSortingFilter(): void {
    const $restaurantList = document.querySelector('.restaurant-list') as HTMLElement;
    const sortingCondition = this.getSelectedSortingCondition();

    if (this.restaurantList == null) return;
    const sortedList = this.restaurantList.getSortedByCondition(sortingCondition);
    $restaurantList.replaceChildren();
    sortedList.forEach(element => {
      new RestaurantComponent({ $target: $restaurantList, information: element.information });
    });
  }

  getSelectedCategory(): TCategory {
    const $categoryFilter = document.getElementById('category-filter') as HTMLSelectElement;
    const categoryOptions = $categoryFilter.options;
    return categoryOptions[categoryOptions.selectedIndex].text as TCategory;
  }

  getSelectedSortingCondition(): TSorting {
    const $sortingFilter = document.getElementById('sorting-filter') as HTMLSelectElement;
    const sortingOptions = $sortingFilter.options;
    return sortingOptions[sortingOptions.selectedIndex].text as TSorting;
  }
}

export default SelectBoxComponent;
