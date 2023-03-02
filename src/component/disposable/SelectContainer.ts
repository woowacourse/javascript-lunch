import Select from "../reusable/Select";

class SelectContainer {
  categorySelect;
  sortingSelect;

  constructor() {
    const category = ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"];
    const sorting = ["이름순", "거리순"];

    this.categorySelect = new Select(
      {
        required: false,
        name: "category",
        id: "category-filter",
        className: "restaurant-filter",
      },
      category
    );

    this.sortingSelect = new Select(
      {
        required: false,
        name: "sorting",
        id: "sorting-filter",
        className: "restaurant-filter",
      },
      sorting
    );
  }

  template() {
    return `
    <section class="restaurant-filter-container">
          ${this.categorySelect.template()}
          ${this.sortingSelect.template()}
    </section>
    `;
  }

  render(target: Element, callback: (id: string, value: string) => void) {
    target.insertAdjacentHTML("beforeend", this.template());
    this.categorySelect.addEvent("category-filter", (id, value) =>
      callback(id, value)
    );
    this.sortingSelect.addEvent("sorting-filter", (id, value) =>
      callback(id, value)
    );
  }
}

export default SelectContainer;
