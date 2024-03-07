import './style.css';

const LUNCH_ITEM_FILTER = `
<section class="restaurant-filter-container">
<select name="category" id="category-filter" class="restaurant-filter">
  <option value="전체">전체</option>
  <option value="한식">한식</option>
  <option value="중식">중식</option>
  <option value="일식">일식</option>
  <option value="양식">양식</option>
  <option value="아시안">아시안</option>
  <option value="기타">기타</option>
</select>

<!-- 정렬 셀렉트 박스 -->
<select name="sorting" id="sorting-filter" class="restaurant-filter">
  <option value="newest"> 최신순 </option>
  <option value="oldest"> 오래된순 </option>
  <option value="nameAscending"> 가게명순▲ </option>
  <option value="nameDescending"> 가게명순▼ </option>
  <option value="distanceAscending"> 거리순▲ </option>
  <option value="distanceDescending"> 거리순▼ </option>
</select>
</section>`;

class LunchItemFilter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_ITEM_FILTER;
  }
}

customElements.define('lunch-item-filter', LunchItemFilter);
