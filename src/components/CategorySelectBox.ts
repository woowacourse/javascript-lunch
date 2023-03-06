import RestaurantList from "./RestaurantList";

class CategorySelectBox extends HTMLElement {
  constructor() {
    super();
    this.render();
    this.onSelectOption();
  }

  render() {
    this.innerHTML = `
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="all">전체</option>
        <option value="korean">한식</option>
        <option value="chinese">중식</option>
        <option value="japanese">일식</option>
        <option value="western">양식</option>
        <option value="asian">아시안</option>
        <option value="etc">기타</option>
      </select>
      `;
  }

  onSelectOption() {
    const categoryFilter = document.getElementById("category-filter");
    if (categoryFilter instanceof HTMLSelectElement) {
      categoryFilter.addEventListener("change", () => {
        this.filterCategory(categoryFilter.value);
      });
    }
  }

  filterCategory(key: string) {
    const restaurantList = document.getElementById("restaurantList");
    if (restaurantList instanceof RestaurantList) {
      restaurantList.filterBy(key);
    }
  }
}

export default CategorySelectBox;
