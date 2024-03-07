import { CATEGORIES_WITH_ALL_KEYS, SORT_CRITERION_KEYS } from '@/constants/Condition';
import BaseComponent from '../BaseComponent';
import SelectBox from '../SelectBox/SelectBox';
class FilterContainer extends BaseComponent {
  render() {
    this.append(new SelectBox(CATEGORIES_WITH_ALL_KEYS, 'category'));
    this.append(new SelectBox(SORT_CRITERION_KEYS, 'sorting'));
  }
  setEvent() {
    this.addEventListener('onChange', (event) => {
      const restaurants = document.querySelector('.restaurant-list-container');
    });
  }
}

customElements.define('filter-container', FilterContainer);

// <!-- 카테고리/정렬 필터 -->
// <section class="restaurant-filter-container">
//   <select name="category" id="category-filter" class="restaurant-filter">
//     <option value="전체">전체</option>
//     <option value="한식">한식</option>
//     <option value="중식">중식</option>
//     <option value="일식">일식</option>
//     <option value="양식">양식</option>
//     <option value="아시안">아시안</option>
//     <option value="기타">기타</option>
//   </select>

//   <!-- 정렬 셀렉트 박스 -->
//   <select name="sorting" id="sorting-filter" class="restaurant-filter">
//     <option value="name">이름순</option>
//     <option value="distance">거리순</option>
//   </select>
// </section>
