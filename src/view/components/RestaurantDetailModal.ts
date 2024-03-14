import { categoryToIconNameMapper, distancesMapper } from "../../constants";
import RestaurantList from "../../domain/RestaurantList";

class RestaurantDetailModal {
  private restaurantList;

  constructor(restaurantList: RestaurantList) {
    this.restaurantList = restaurantList;
  }

  renderInit() {
    return /*html */ `
      <div class="modal" id="restaurant-detail__modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container"></div>
      </div>
    `;
  }

  openModal(id: number) {
    const $restaurantDetailModal = document.querySelector(
      "#restaurant-detail__modal"
    );
    if ($restaurantDetailModal === null) {
      return;
    }
    $restaurantDetailModal.classList.add("modal--open");

    const restaurant = this.restaurantList.getRestaurant(id);

    const $modalContainer =
      $restaurantDetailModal.querySelector(".modal-container");
    if ($modalContainer === null) {
      return;
    }
    $modalContainer.innerHTML = /*html*/ `
      <div class="restaurant__modal-card">
        <div class="restaurant__header">
          <div class="restaurant__category">
            <img
              src=${categoryToIconNameMapper[restaurant.category]}
              alt=${restaurant.category}
              class="category-icon"
            />
          </div>
          <img
            class="favorite-icon"
            src=${
              restaurant.isGoTo
                ? "favorite-icon-filled.png"
                : "./favorite-icon-lined.png"
            }
            alt=${restaurant.isGoTo ? "자주가는음식점" : "자주가지않는음식점"}
          />
        </div>
        <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스부터 ${distancesMapper[restaurant.distance]}</span
        >
        <p>${restaurant.description}</p>
        <a href=${restaurant.link}>${restaurant.link}</a>
        <div class="button-container">
          <button
            type="button"
            class="button button--secondary text-caption"
            id="restaurant-detail-remove-button"
            data-id=${restaurant.id}
          >
            삭제하기
          </button>
          <button class="button button--primary text-caption" id="restaurant-detail-close-button">닫기</button>
        </div>
      </div>
    `;
  }

  closeModal() {
    const $restaurantDetailModal = document.querySelector(
      "#restaurant-detail__modal"
    );
    if ($restaurantDetailModal === null) {
      return;
    }
    $restaurantDetailModal.classList.remove("modal--open");
  }

  setEvent(type: string, listener: (event: Event) => void) {
    const $restaurantDetailModal = document.querySelector(
      "#restaurant-detail__modal"
    );
    if ($restaurantDetailModal === null) {
      return;
    }
    $restaurantDetailModal.addEventListener(type, (event: Event) => {
      const $target = (event.target as Element).closest(
        "#restaurant-detail-remove-button"
      );
      if ($target instanceof HTMLElement) {
        this.restaurantList.removeRestaurant(Number($target.dataset.id));
        this.closeModal();
        listener(event);
      }
    });
  }

  setCloseEvent(type: string, listener: (event: Event) => void) {
    const $restaurantDetailModal = document.querySelector(
      "#restaurant-detail__modal"
    );
    if ($restaurantDetailModal === null) {
      return;
    }
    $restaurantDetailModal.addEventListener(type, (event: Event) => {
      if (
        (event.target as Element).closest("#restaurant-detail-close-button")
      ) {
        listener(event);
      }
    });
  }
}

export default RestaurantDetailModal;
