import type { IOptionAttributes, IDropdownAttributes } from '@/types/dom';
import type RestaurantList from '@/domain/RestaurantList';
import dom from '@/utils/dom';
import type { IRestaurantList, TCategory, TSorting } from '@/types/restaurant';
import Component from './core/Component';
import RestaurantItem from './RestaurantItem';

interface IDropdown {
  $target: HTMLElement;
  props: IDropdownProps;
}

interface IDropdownProps {
  attributes: IDropdownAttributes;
  options: IOptionAttributes[];
  kind?: 'category' | 'sorting';
  restaurantList?: RestaurantList;
}

class Dropdown extends Component<IDropdownProps> {
  constructor({ $target, props }: IDropdown) {
    super($target, props);
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
    sortedList.forEach(restaurant => {
      new RestaurantItem({
        $target: $restaurantList,
        props: { information: restaurant.information },
      });
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

export default Dropdown;
