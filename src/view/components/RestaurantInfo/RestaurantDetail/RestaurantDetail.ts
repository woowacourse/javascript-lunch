import "../style.css";

import categoryImgSrcMatcher from "../utils/categoryImgSrcMatcher";
import createElementByTag from "../../../utils/createElementByTag";

class RestaurantDetail {
  element: HTMLElement = createElementByTag({
    tag: "section",
    classes: ["restaurant-detail"],
  });

  #categoryImg = createElementByTag({
    tag: "img",
    classes: ["category-icon", "restaurant-detail--item"],
  });

  #name: HTMLElement = createElementByTag({
    tag: "h2",
    classes: ["text-title", "restaurant-detail--item"],
  });

  #distance: HTMLElement = createElementByTag({
    tag: "span",
    classes: [
      "text-body",
      "restaurant-detail--item",
      "restaurant-detail__distance",
    ],
  });

  #description: HTMLElement = createElementByTag({
    tag: "p",
    classes: [
      "text-body",
      "restaurant-detail--item",
      "restaurant-detail__description",
    ],
  });

  #url: HTMLAnchorElement = createElementByTag({
    tag: "a",
    classes: ["text-body", "restaurant-detail__url"],
  }) as HTMLAnchorElement;

  constructor() {
    this.#name.id = "restaurant-detail--name";
    this.element.append(
      this.#createCategoryDiv(),
      this.#name,
      this.#distance,
      this.#description,
      this.#url
    );
  }

  setDetail(restaurant: Restaurant) {
    this.#name.textContent = restaurant.name;
    this.#distance.textContent = `캠퍼스로부터 ${restaurant.distance}분 내`;
    this.#setCategoryDiv(restaurant.category);
    this.#description.textContent = restaurant.description ?? "";
    this.#setUrl(restaurant.url ?? "");
  }

  #createCategoryDiv() {
    const div = createElementByTag({
      tag: "div",
      classes: ["restaurant__category", "restaurant-detail--item"],
    });

    div.appendChild(this.#categoryImg);
    return div;
  }

  #setCategoryDiv(category: Category) {
    this.#categoryImg.setAttribute("src", categoryImgSrcMatcher[category]);
    this.#categoryImg.setAttribute("alt", category);
  }

  #setUrl(url: string) {
    this.#url.href = url;
    this.#url.text = url;
  }
}

export default RestaurantDetail;
