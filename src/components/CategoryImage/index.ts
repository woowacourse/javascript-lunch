import BaseComponent from "../BaseComponent";
import { CATEGORIES } from "../../constants/menu";
import { CategoryStringWithoutAll } from "../../types/menu";
import {
  categoryKorean,
  categoryAsian,
  categoryChinese,
  categoryJapanese,
  categoryWestern,
  categoryEtc,
} from "../../assets";

class CategoryImage extends BaseComponent {
  private isCategoryType(category: string): category is CategoryStringWithoutAll {
    return ["한식", "아시안", "일식", "중식", "양식", "기타"].includes(category);
  }

  private categoryToImg(category: CategoryStringWithoutAll) {
    if (!category) return;

    switch (category) {
      case CATEGORIES.korean:
        return categoryKorean;
      case CATEGORIES.asian:
        return categoryAsian;
      case CATEGORIES.japanese:
        return categoryJapanese;
      case CATEGORIES.chinese:
        return categoryChinese;
      case CATEGORIES.western:
        return categoryWestern;
      case CATEGORIES.etc:
        return categoryEtc;
      default:
        break;
    }
  }

  render() {
    const category = this.getAttribute("category") ?? "";
    if (!this.isCategoryType(category)) return;

    const categoryImage = this.categoryToImg(category);
    this.innerHTML = /*html*/ `
      <div class="restaurant__category">
        <img src=${categoryImage} alt=${category} class="category-icon">
      </div>
    `;
  }
}

customElements.define("category-image", CategoryImage);
