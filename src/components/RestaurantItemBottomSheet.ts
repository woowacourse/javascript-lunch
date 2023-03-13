import restaurantListHandler from "../domain/restaurantListHandler";
import { categoryToSrc } from "../utils/convertor";
import { $ } from "../utils/Dom";
import type { Category, Restaurant } from "./../types/type";
import Bookmark from "./common/Bookmark";

class RestaurantItemBottomSheet {
  restaurant: Restaurant;
  bookmark: Bookmark;
  deleteItem: (id: string) => void;

  constructor(restaurant: Restaurant, deleteItem: (id: string) => void) {
    this.restaurant = restaurant;
    this.deleteItem = deleteItem;
    const bookmark = new Bookmark(this.restaurant);
    this.bookmark = bookmark;
  }

  template() {
    return `<div class="item-sheet" data-id="${this.restaurant.id}">
      <div class="modal-backdrop item-sheet-backdrop"></div>
      <div class="modal-container">
      <div class="item__header">
        <div class="restaurant__category">
          <img src=${categoryToSrc(<Category>this.restaurant.category)} alt=${
      this.restaurant.category
    } class="category-icon">
            </div>
            ${this.bookmark.template()}
        </div>
            <div class="item__info">
          <h3 class="item__name text-subtitle">${this.restaurant.name}</h3>
          <span class="item__distance text-body">캠퍼스부터 ${
            this.restaurant.takingTime
          }분 내</span>
          <p class="item__description text-body">${
            this.restaurant.description
          }</p>
          <p>${this.restaurant.link}</p>
        </div>
          <div class="button-container">
          <button type="submit" class="button button--secondary text-caption item-sheet--delete">삭제하기</button>
          <button type="button" class="button button--primary text-caption item-sheet--close">닫기</button>
          </div>
        </div>
    </div>`;
  }

  initialize(rerenderList: () => void) {
    this.render();
    this.addEvent(rerenderList);
  }

  render() {
    $("body")?.insertAdjacentHTML("beforeend", this.template());
  }

  addEvent(rerenderList: () => void) {
    this.handleBookmark(rerenderList);
    this.handleSheetDelete();
    this.handleSheetClose();
  }

  handleBookmark(rerenderList: () => void) {
    const bottomSheetHeader = <HTMLElement>$(".item__header");
    bottomSheetHeader?.addEventListener("click", (event) => {
      const bookmarkButton = <HTMLElement>event.target;
      const id = this.restaurant.id;

      if (bookmarkButton) {
        restaurantListHandler.toggleBookmark(id);

        bookmarkButton.remove();
        this.restaurant.bookmark = !this.restaurant.bookmark;
        bottomSheetHeader.insertAdjacentHTML(
          "beforeend",
          this.bookmark.template()
        );

        rerenderList();
        return;
      }
    });
  }

  handleSheetDelete() {
    $(".item-sheet--delete")?.addEventListener("click", () => {
      this.deleteItem(this.restaurant.id);
      this.closeSheet();
    });
  }

  handleSheetClose() {
    const itemSheetElements = [
      $(".item-sheet--close"),
      $(".item-sheet-backdrop"),
    ];

    itemSheetElements.forEach((element) => {
      element?.addEventListener("click", () => {
        this.closeSheet();
      });
    });
  }

  closeSheet() {
    $(".item-sheet")?.remove();
  }
}

export default RestaurantItemBottomSheet;
