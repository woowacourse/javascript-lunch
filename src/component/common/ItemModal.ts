import { Restaurant } from "@/type/type";
import { $ } from "@/utils/Dom";
import { generateId } from "@/utils/generateId";
import "@/assets/category-korean.png";

class ItemModal {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <div class="item-modal modal--open">
      <div class="modal-backdrop"></div>
      <div class="modal-container item-modal-container">
        <div class="images flex-row">
          <div class="restaurant__category">
            <img src=${categoryToSrc(this.restaurant.category)} alt=${
      this.restaurant.category
    }/></div>
          <img src=${
            this.restaurant.bookmarked
              ? "./favorite-icon-filled.png"
              : "./favorite-icon-lined.png"
          } alt="bookmarked" class="bookmark"/>
        </div>
        <div class="item-information">
          <h3 class="item__name text-subtitle">${this.restaurant.name}</h3>
          <div class="item__takingTime text-body">캠퍼스부터 ${
            this.restaurant.takingTime
          }분 내</div>
          <p class="item__description text-body">${
            this.restaurant.description
          }</p>
          <span class="restaurant__link">
            <a target='_blank' href=${this.restaurant.link}>${
      this.restaurant.link
    }</a></span>
        </div>
        <div class="button-container">
          <button type="button" class="button button--secondary text-caption item-modal--delete">삭제하기</button>
          <button type="button" class="button button--primary text-caption item-modal--close">닫기</button>
        </div>
      </div>
    </div>
    `;
  }

  render() {
    $("body")?.insertAdjacentHTML("beforeend", this.template());
  }

  close() {
    $(".item-modal")?.remove();
  }

  addEvent() {
    $(".item-modal--close")?.addEventListener("click", () => {
      this.close();
    });

    $(".item-modal--delete")?.addEventListener("click", () => {
      const deleteWill = confirm("정말 삭제하시겠습니까?");
      if (deleteWill) {
        //배열에서 삭제
        this.close();
      }
    });
  }
}

export default ItemModal;
