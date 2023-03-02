const FilterButton = {
  template() {
    return `
    <select name="category" id="category-filter" class="restaurant-filter">
    <option value="전체">전체</option>
    <option value="한식">한식</option>
    <option value="중식">중식</option>
    <option value="일식">일식</option>
    <option value="양식">양식</option>
    <option value="아시안">아시안</option>
    <option value="기타">기타</option>
  </select>`;
  },
  setEvent() {
    const restaurantFilter = document.querySelector(".restaurant-filter");
    restaurantFilter?.addEventListener("click", () => {
      // 이벤트 추가 필요
      console.log("filter");
    });
  },
};

export default FilterButton;
