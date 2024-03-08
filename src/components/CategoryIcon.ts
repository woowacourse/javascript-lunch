import BaseComponent from "../abstract/BaseComponent";

import { Category } from "./../types/Category";
import "../../templates/add-button.png";
import "../../templates/category-korean.png";
import "../../templates/category-chinese.png";
import "../../templates/category-western.png";
import "../../templates/category-japanese.png";
import "../../templates/category-asian.png";
import "../../templates/category-etc.png";

type ImagePath = string;

type CategoryToImagePath = {
  [key in Category]: ImagePath;
};

const CATEGORY_TO_IMAGE_PATH: CategoryToImagePath = {
  korean: "./category-korean.png",
  chinese: "./category-chinese.png",
  japanese: "./category-japanese.png",
  western: "./category-western.png",
  asian: "./category-asian.png",
  etc: "./category-etc.png",
};

export default class CategoryIcon extends BaseComponent {
  protected getTemplate(): string {
    const category = this.getAttribute("category");

    if (!category || !this.isCategory(category)) {
      throw new Error("유효하지 않은 카테고리입니다.");
    }

    const categoryImage = this.convertCategoryToImage(category);

    return `
      <div class="restaurant__category">
        <img class="category-icon" src=${categoryImage} alt=${category}>
      </div>
    `;
  }

  private isCategory(category: string): category is keyof CategoryToImagePath {
    return Object.keys(CATEGORY_TO_IMAGE_PATH).includes(category);
  }

  private convertCategoryToImage(category: Category): ImagePath {
    return CATEGORY_TO_IMAGE_PATH[category];
  }

  static get observedAttributes() {
    return ["category"];
  }
}
