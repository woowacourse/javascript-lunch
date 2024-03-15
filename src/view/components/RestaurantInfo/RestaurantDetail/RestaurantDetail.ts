import categoryImgSrcMatcher from "../utils/categoryImgSrcMatcher";
import createElementByTag from "../../../utils/createElementByTag";

class RestaurantDetail {
  #element: HTMLElement = document.createElement("section");

  #categoryImg = createElementByTag({
    tag: "img",
    classes: ["category-icon"],
  });

  #name: HTMLElement = createElementByTag({
    tag: "h2",
    classes: ["text-title"],
  });

  #distance: HTMLElement = createElementByTag({
    tag: "span",
    classes: ["text-body"],
  });

  #description: HTMLElement = createElementByTag({
    tag: "p",
    classes: ["text-body"],
  });

  #url: HTMLAnchorElement = createElementByTag({
    tag: "a",
  }) as HTMLAnchorElement;

  constructor() {
    this.#element.append(
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
    if (restaurant.description)
      this.#description.textContent = restaurant.description;
    if (restaurant.url) this.#setUrl(restaurant.url);
  }

  #createCategoryDiv() {
    const div = createElementByTag({
      tag: "div",
      classes: ["restaurant__category"],
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
