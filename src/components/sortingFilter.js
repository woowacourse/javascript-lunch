import { $inBody } from '../util/selector';

class SortingFilter {
  render() {
    $inBody('.restaurant-filter-container').insertAdjacentHTML(
      'beforeend',
      this.template()
    );
  }

  template() {
    return `
			<select name="sorting" id="sorting-filter" class="restaurant-filter">
				<option value="name">이름순</option>
				<option value="distance">거리순</option>
			</select>
		`;
  }
}

export default SortingFilter;
