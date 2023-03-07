import "../../css/style.css";
import { Category } from "../type/restaurant";
import { $ } from "../util/querySelector";

class RestaurantList {
  templateList: Element | null;
  name: string;
  distance: string;
  category: Category;
  img: string;

  constructor(name: string, distance: string, category: Category, img: string) {
    this.templateList = $("#list-template");
    this.name = name;
    this.distance = distance;
    this.category = category;
    this.img = img;
  }

  create() {
    return `
        <li class="restaurant">
        <div class="restaurant__category">
          <img src=${this.img} alt="" class="category-icon" />
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.name}</h3>
          <span class="restaurant__distance text-body">${this.distance}</span>
          <p class="restaurant__description text-body"></p>
        </div>
      </li>
        `;
  }

  render() {
    const listSection = $(".restaurant-list-container") as HTMLElement;
    const listWrapper = document.createElement("div");

    listWrapper.innerHTML = this.create();
    listSection.appendChild(listWrapper);
  }
}

export default RestaurantList;
