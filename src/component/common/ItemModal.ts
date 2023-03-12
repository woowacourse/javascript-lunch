import { Restaurant } from "@/type/type";
import { categoryToSrc } from "@/utils/convertor";
import { StarImgPath } from "@/constant/Restaurant";
import { $ } from "@/utils/Dom";
import restaurantListHandler from "@/domain/restaurantListHandler";
import render from "@/view/render";
import AppController from "@/AppDataController";

class ItemModal {
  restaurant: Restaurant;

  constructor(restaurant: Restaurant) {
    this.restaurant = restaurant;
  }

  template() {
    return `
    <div class="item-modal modal--open">
      <div class="modal-backdrop item-modal-backdrop"></div>
      <div class="modal-container item-modal-container">
        <div class="images flex-row">
          <div class="restaurant__category">
            <img src=${categoryToSrc(this.restaurant.category)} alt=${
      this.restaurant.category
    }/></div>
          <img src=${
            this.restaurant.bookmarked
              ? `./${StarImgPath.FILLED_STAR}`
              : `./${StarImgPath.EMPTY_STAR}`
          } alt="bookmarked" class="item-bookmark bookmark"/>
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

    $(".item-modal-backdrop")?.addEventListener("click", () => {
      this.close();
    });

    $(".item-modal--delete")?.addEventListener("click", () => {
      restaurantListHandler.deleteRestaurant(this.restaurant.id);
      const restaurantList = AppController.getRestaurantList();
      render.updateRestaurantList(restaurantList);
      this.close();
    });

    $(".item-bookmark")?.addEventListener("click", () => {
      this.onClickBookmark();
    });
  }

  bookMarkTemplate() {
    return `<img src=${
      this.restaurant.bookmarked
        ? `./${StarImgPath.FILLED_STAR}`
        : `./${StarImgPath.EMPTY_STAR}`
    } alt="bookmarked" class="item-bookmark bookmark"/>`;
  }

  renderBookmark() {
    $(".item-bookmark")?.remove();

    $(".images")?.insertAdjacentHTML("beforeend", this.bookMarkTemplate());

    $(".item-bookmark")?.addEventListener("click", () => {
      this.onClickBookmark();
    });
  }

  onClickBookmark() {
    restaurantListHandler.toggleBookmark(this.restaurant.id);
    this.restaurant.bookmarked = !this.restaurant.bookmarked;
    this.renderBookmark();

    const restaurantList = AppController.getRestaurantList();
    render.updateRestaurantList(restaurantList);
  }
}

export default ItemModal;
