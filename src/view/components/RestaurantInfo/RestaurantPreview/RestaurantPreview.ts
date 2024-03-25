import "../style.css";

import categoryImgSrcMatcher from "../utils/categoryImgSrcMatcher";
import createElementByTag from "../../../utils/createElementByTag";

class RestaurantPreview {
  element = createElementByTag({
    tag: "li",
    classes: ["restaurant"],
  });

  restaurant: Restaurant;

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

    this.restaurant = restaurant;

    this.element.append(this.#categoryDiv, this.#InfoDiv);

    Object.entries(restaurant).forEach((entry) => {
      const [key, value] = entry;
      if (!value) return;
      this.element.setAttribute(`data-${key}`, value);
    });

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
    url = "",
  }: {
    name: string;
    distance: number;
    description?: string;
    url?: string;
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
    const a = createElementByTag({
      tag: "a",
      classes: ["restaurant__link"],
      contents: url,
    });

    div.append(h3, span, p, a);

    return div;
  };
}

export default RestaurantPreview;
