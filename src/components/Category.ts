import { CategoryType } from "../type/category";
import { $ } from "../util/querySelector";

class Category {
  #selected: CategoryType = "all";

  get selected() {
    return this.#selected;
  }

  create() {
    return `
        <section class="nav-container">
      <label class="category-label all selected">
        <input class="category-nav " value="모든 음식점" type="radio" name="category" style="display: none"></input>
        모든 음식점
      </label>
      <label class="category-label favorate">
        <input class="category-nav " value="자주 가는 음식점" type="radio" name="category" style="display: none"></input>
        자주 가는 음식점
      </label>
  </section>
        `;
  }

  render() {
    const mainSection = $("main");
    const categoryContainer = document.createElement("div");

    categoryContainer.innerHTML = this.create();
    mainSection?.prepend(categoryContainer);
    this.checkSelectedOption();
  }

  checkSelectedOption() {
    const optionContainer = $(".nav-container");

    optionContainer?.addEventListener("click", (e) => {
      this.changeSelectedStyle(e);
    });
  }

  changeSelectedStyle(e: Event) {
    const allOption = $(".all");
    const favorateOption = $(".favorate");

    if (e.target === allOption) {
      this.#selected = "all";
      allOption?.classList.add("selected");
      favorateOption?.classList.remove("selected");
      return;
    }

    if (e.target === favorateOption) {
      this.#selected = "favorite";
      favorateOption?.classList.add("selected");
      allOption?.classList.remove("selected");
    }
  }

  handleClickCategory(renderFavorates: any, reRenderRestaurantList: any) {
    $(".favorate")?.addEventListener("click", renderFavorates);

    $(".all")?.addEventListener("click", reRenderRestaurantList);
  }
}

export default Category;
