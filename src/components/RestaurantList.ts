import "../../css/style.css";
import Elements from "../Element";
import { $ } from "../util/querySelector";
import Modal from "./Modal";

class RestaurantList {
  img: string;
  currentIndex: number;
  element: any;
  starImage: string;
  starEmpty: string;
  isFavorate: boolean;

  constructor(
    element: any,
    img: string,
    index: number,
    starImage: string,
    starEmpty: string
  ) {
    this.element = element;
    this.img = img;
    this.currentIndex = index;
    this.starImage = starImage;
    this.starEmpty = starEmpty;
    this.isFavorate = false;
  }

  getRestaurantInfo() {}

  create() {
    return `
      <li class="restaurant" id=${this.currentIndex}>
        <div class="list-info-wrapper">
          <div class="restaurant__category">
            <img src=${this.img} alt="" class="category-icon" />
            </div>
            </div>
            <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${this.element.name}</h3>
            <span class="restaurant__distance text-body">${
              this.element.distance
            }</span>
            <p class="restaurant__description text-body">${
              this.element.description
            }</p>
            </div>
            <img class="star" id=star-${this.currentIndex} src=${
      this.isFavorate ? this.starImage : this.starEmpty
    } alt="star"/>
      </li>
        `;
  }

  render() {
    const listSection = $(".restaurant-list-container")!;
    const listWrapper = document.createElement("div");

    listWrapper.innerHTML = this.create();
    listSection.appendChild(listWrapper);
  }

  getListInfo(callback: any) {
    document
      .getElementById(String(this.currentIndex))
      ?.addEventListener("click", (e) => {
        console.log(e.target);
        const starIcon = document.getElementById(`star-${this.currentIndex}`);
        if (e.target === starIcon) {
          callback(e, this.isFavorate);
          return;
        }
        this.showRestaurantDetail();
      });
  }

  getModalContent() {
    console.log(this.element);
    return Elements.listDetailContents(this.element, this.img);
  }

  showRestaurantDetail() {
    const detailModal = new Modal(this.getModalContent());
    detailModal.render();
  }
}

export default RestaurantList;
