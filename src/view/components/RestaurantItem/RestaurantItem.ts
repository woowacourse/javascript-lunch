import "./style.css";

import ASIAN_ICON from "./icons/category-asian.png";
import CHINESE_ICON from "./icons/category-chinese.png";
import ECT_ICON from "./icons/category-etc.png";
import JAPANESE_ICON from "./icons/category-japanese.png";
import KOREAN_ICON from "./icons/templates/category-korean.png";
import WESTERN_ICON from "./icons/templates/category-western.png";
import createElementByTag from "../../utils/createElementByTag";

const categoryImgSrcMatcher = {
  한식: KOREAN_ICON,
  중식: CHINESE_ICON,
  일식: JAPANESE_ICON,
  아시안: ASIAN_ICON,
  양식: WESTERN_ICON,
  기타: ECT_ICON,
};

class RestaurantItem {
  element = createElementByTag({
    tag: "li",
    classes: ["restaurant"],
  });

  #categoryDiv: HTMLElement;

  #InfoDiv: HTMLElement;

  constructor({
    restaurant,
    eventListenerArgs = [],
  }: {
    restaurant: Restaurant;
    eventListenerArgs?: EventListenerArg[];
  }) {
    this.#categoryDiv = this.#createCategoryDiv(restaurant.category);
    this.#InfoDiv = this.#createInfoDiv(restaurant);

    this.element.append(this.#categoryDiv, this.#InfoDiv);

    eventListenerArgs.forEach((args) => {
      this.element.addEventListener(...args);
    });
  }

  #createCategoryDiv(category: Category) {
    const div = createElementByTag({
      tag: "div",
      classes: ["restaurant__category"],
    });
    const img = createElementByTag({
      tag: "img",
      classes: ["category-icon"],
    });
    img.setAttribute("src", categoryImgSrcMatcher[category]);
    img.setAttribute("alt", category);

    div.appendChild(img);
    return div;
  }

  #createInfoDiv = ({
    name,
    distance,
    description = "",
  }: {
    name: string;
    distance: number;
    description?: string;
  }) => {
    const div = createElementByTag({
      tag: "div",
      classes: ["restaurant__info"],
    });
    const h3 = createElementByTag({
      tag: "h3",
      classes: ["restaurant__name", "text-subtitle"],
      contents: name,
    });
    const span = createElementByTag({
      tag: "span",
      classes: ["restaurant__distance", "text-body"],
      contents: `캠퍼스로부터 ${distance}분 내`,
    });
    const p = createElementByTag({
      tag: "p",
      classes: ["restaurant__description", "text-body"],
      contents: description,
    });

    div.append(h3, span, p);

    return div;
  };
}

export default RestaurantItem;
