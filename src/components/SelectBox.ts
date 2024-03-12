import type { IOptionAttributes, ISelectAttributes } from '@/types/dom';
import RestaurantComponent from './Restaurant';
import type RestaurantList from '@/domain/RestaurantList';
import dom from '@/utils/dom';
import type { IRestaurantList, TCategory, TSorting } from '@/types/restaurant';
import Component from './core/Component';

interface ISelectBox {
  $target: HTMLElement;
  props: ISelectBoxProps;
}

interface ISelectBoxProps {
  attributes: ISelectAttributes;
  options: IOptionAttributes[];
  kind?: 'category' | 'sorting';
  restaurantList?: RestaurantList;
}

class SelectBoxComponent extends Component<ISelectBoxProps> {
  constructor({ $target, props }: ISelectBox) {
    super({ $target, props });
  }

  setEvent(): void {
    if (this.props.kind === 'category') this.$target.addEventListener('change', this.handleCategoryFilter.bind(this));
    if (this.props.kind === 'sorting') this.$target.addEventListener('change', this.handleSortingFilter.bind(this));
  }

  render(): void {
    const selectTag = this.getSelectTag();
    this.props.options.forEach(option => {
      const optionTag = dom.createOptionTag({ value: option.value, text: option.text });
      selectTag.appendChild(optionTag);
    });
    this.$target.appendChild(selectTag);
    this.$target = selectTag;
  }

  getSelectTag(): HTMLSelectElement {
    const { name, id, classNames, required } = this.props.attributes;
    return dom.createSelectTag({ name, id, classNames, required });
  }

  renderNewRestaurantList(sortedList: IRestaurantList): void {
    const $restaurantList = dom.getElement('.restaurant-list');
    $restaurantList.replaceChildren();
    sortedList.forEach(element => {
      new RestaurantComponent({ $target: $restaurantList, information: element.information });
    });
  }

  handleCategoryFilter(): void {
    const category = this.getSelectedCategory();
    const sortingCondition = this.getSelectedSortingCondition();
    if (this.props.restaurantList == null) return;
    this.props.restaurantList.filterByCategory(category);
    const sortedList = this.props.restaurantList.getSortedByCondition(sortingCondition);
    this.renderNewRestaurantList(sortedList);
  }

  handleSortingFilter(): void {
    const sortingCondition = this.getSelectedSortingCondition();
    if (this.props.restaurantList == null) return;
    const sortedList = this.props.restaurantList.getSortedByCondition(sortingCondition);
    this.renderNewRestaurantList(sortedList);
  }

  getSelectedCategory(): TCategory {
    const $categoryFilter = dom.getElement('#category-filter') as HTMLSelectElement;
    const categoryOptions = $categoryFilter.options;
    return categoryOptions[categoryOptions.selectedIndex].text as TCategory;
  }

  getSelectedSortingCondition(): TSorting {
    const $sortingFilter = dom.getElement('#sorting-filter') as HTMLSelectElement;
    const sortingOptions = $sortingFilter.options;
    return sortingOptions[sortingOptions.selectedIndex].text as TSorting;
  }
}

export default SelectBoxComponent;
