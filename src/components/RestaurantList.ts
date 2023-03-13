import "../../css/style.css";
import Elements from "../Element";
import { Restaurant } from "../type/restaurant";
import { $ } from "../util/querySelector";
import Modal from "./Modal";

class RestaurantList {
  img: string;
  currentIndex: number;
  element: Restaurant;
  starImage: string;
  starEmpty: string;
  isFavorate: boolean;
  isDeleted: boolean;

  constructor(
    element: Restaurant,
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
    this.isDeleted = false;
  }

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

  hadleListClick(callback: any, deleteList: any) {
    document
      .getElementById(String(this.currentIndex))
      ?.addEventListener("click", (e) => {
        const starIcon = document.getElementById(`star-${this.currentIndex}`);
        if (e.target === starIcon) {
          this.isFavorate === true
            ? (this.isFavorate = false)
            : (this.isFavorate = true);

          callback();
          return;
        }
        this.showRestaurantDetail(deleteList);
      });
  }

  getModalContent() {
    const currentStarImage = this.isFavorate ? this.starImage : this.starEmpty;
    return Elements.listDetailContents(
      this.element,
      this.img,
      currentStarImage
    );
  }

  showRestaurantDetail(deleteList: any) {
    const detailModal = new Modal(this.getModalContent());

    detailModal.render();
    this.hadleClickDelete(deleteList);
  }

  hadleClickDelete(deleteList: any) {
    $(".delete")?.addEventListener("click", () => {
      this.isDeleted = true;
      deleteList(this.element.name);
    });
  }
}

export default RestaurantList;
