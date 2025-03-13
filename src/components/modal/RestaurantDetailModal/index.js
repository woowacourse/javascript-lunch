import Modal from "../common/Modal.js";

class RestaurantDetailModal extends Modal {
  #restaurant;

  constructor($target, restaurant) {
    super($target);
    this.#restaurant = restaurant;
  }

  contents() {
    const imageSource = {
      한식: "category-korean.png",
      중식: "category-chinese.png",
      일식: "category-japanese.png",
      양식: "category-western.png",
      아시안: "category-asian.png",
      기타: "category-etc.png",
    };

    return /*html */ `
      <div class="space-between">
        <div class="restaurant__category">
          <img src="./icons/${imageSource[this.#restaurant.category]}" alt="${
      this.#restaurant.category
    }" class="category-icon" />
        </div>
        <img src="${
          this.#restaurant.isFavorite
            ? "./icons/favorite-icon-filled.png"
            : "./icons/favorite-icon-lined.png"
        }" alt="${
      this.#restaurant.isFavorite ? "favorite" : "not-favorite"
    }" class="favorite-icon" />
      </div>
      <div class="mt-16 gap-16 mb-32">
        <h3 class="restaurant__name text-subtitle">${this.#restaurant.name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${
          this.#restaurant.distance
        }분 내</span>
        <p class="text-body">${this.#restaurant.description}</p>
        <a href="${
          this.#restaurant.link
        }" class="text-caption link" target="_blank" rel="noopener noreferrer">${
      this.#restaurant.link
    }</a>
      </div>
      <div class="button-container">
        <button type="button" id="delete-restaurant" class="button button--secondary text-caption" data-testid="delete-restaurant">삭제하기</button>
        <button id="close-modal" class="button button--primary text-caption" data-testid="close-modal">닫기</button>
      </div>
    `;
  }

  open() {
    super.open();
    if (this.isOpen) {
      this.#addEventListeners();
    }
  }

  #addEventListeners() {
    const $deleteButton = document.querySelector("#delete-restaurant");
    const $closeButton = document.querySelector("#close-modal");

    $deleteButton.removeEventListener("click", this.#handleDelete);
    $closeButton.removeEventListener("click", this.handleClose);

    $deleteButton.addEventListener("click", this.#handleDelete);
    $closeButton.addEventListener("click", this.handleClose);
  }

  #handleDelete = (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData.entries());
      this.close();
    } catch (error) {
      alert(error.message);
    }
  };
}

export default RestaurantDetailModal;
