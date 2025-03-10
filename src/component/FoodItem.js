import { getInput } from "../util/getInput";
import { validateFoodItem } from "../validate/validateFoodItem";

export class FoodItem {
  foodItem;

  constructor() {
    this.foodItem = {
      category: getInput("category"),
      name: getInput("name"),
      distance: getInput("distance"),
      description: getInput("description"),
      link: getInput("link"),
    };
  }

  #getImgSrcAlt(category) {
    switch (category) {
      case "한식":
        return { imgAlt: "한식", imgSrc: "./category-korean.png" };
      case "중식":
        return { imgAlt: "중식", imgSrc: "./category-chinese.png" };
      case "일식":
        return { imgAlt: "일식", imgSrc: "./category-japanese.png" };
      case "양식":
        return { imgAlt: "양식", imgSrc: "./category-western.png" };
      case "아시안":
        return { imgAlt: "아시안", imgSrc: "./category-asian.png" };
      default:
        return { imgAlt: "기타", imgSrc: "./category-etc.png" };
    }
  }

  getFoodItem() {
    try {
      validateFoodItem(this.foodItem);
      return this.#createFoodItem();
    } catch (error) {
      return;
    }
  }

  #createFoodItem() {
    const container = document.createElement("div");
    const { category, name, distance, description, link } = this.foodItem;

    const { imgSrc, imgAlt } = this.#getImgSrcAlt(category);
    container.innerHTML = `
     <li class="restaurant">
          <div class="restaurant__category">
            <img src=${imgSrc} alt=${imgAlt} class="category-icon">
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
            <p class="restaurant__description text-body">${description}</p>
          </div>
        </li>`;

    return container.firstElementChild;
  }
}
