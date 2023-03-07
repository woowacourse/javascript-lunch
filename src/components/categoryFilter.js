import { $inBody } from '../util/selector';

class CategoryFilter {
  render() {
    $inBody('.restaurant-filter-container').insertAdjacentHTML(
      'beforeend',
      this.template()
    );
  }

  template() {
    return `
			<label for="category-filter" />
			<select name="category" id="category-filter" class="restaurant-filter">
				<option value="전체">전체</option>
				<option value="한식">한식</option>
				<option value="중식">중식</option>
				<option value="일식">일식</option>
				<option value="양식">양식</option>
				<option value="아시안">아시안</option>
				<option value="기타">기타</option>
			</select>
		`;
  }
}

export default CategoryFilter;
