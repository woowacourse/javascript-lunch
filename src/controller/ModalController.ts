import AddRestaurantForm from "../view/components/AddRestaurantForm/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../constants/formItemTexts";
import Modal from "../view/components/Modal/Modal";
import RenderController from "./RenderController";
import RestaurantDetail from "../view/components/RestaurantInfo/RestaurantDetail/RestaurantDetail";
import RestaurantListController from "./RestaurantListController";
import SubmitButton from "../view/components/SubmitButton/SubmitButton";
import createElementByTag from "../view/utils/createElementByTag";
import findAncestorHasClass from "../utils/findAncestorHasClass";

class ModalController {
  static #addRestaurantTitle = createElementByTag({
    tag: "h2",
    classes: ["modal-title", "text-title"],
    contents: FORM_ITEM_TEXTS.formTitle,
  });

  static #addRestaurantForm = this.#createAddRestaurantForm();

  static #restaurantDetail = new RestaurantDetail();

  static #restaurantDetailButtonDiv = this.#createRestaurantDetailButtonDiv();

  static modal = this.#createModal();

  static changeIntoAddRestaurantForm() {
    this.modal.replaceContents([
      this.#addRestaurantTitle,
      this.#addRestaurantForm.element,
    ]);
  }

  static changeIntoRestaurantDetail() {
    this.modal.replaceContents([
      this.#restaurantDetail.element,
      this.#restaurantDetailButtonDiv,
    ]);
  }

  static setRestaurantDetail(restaurant: Restaurant) {
    this.#restaurantDetail.setDetail(restaurant);
  }

  static openModal() {
    this.modal.open();
  }
  static closeModal() {
    this.modal.close();
  }

  static #createModal() {
    const modal = new Modal({
      eventListenerArgs: [
        [
          "submit",
          (e) => {
            e.preventDefault();
            RenderController.renderRestaurantListUl();
            modal.close();
          },
        ],
      ],
    });

    modal.element.addEventListener("submit", () => {
      this.#addRestaurantForm.removeErrorPrint();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") modal.close();
    });

    return modal;
  }

  static #createAddRestaurantForm() {
    const submitFunc = (restaurant: Restaurant) => {
      RestaurantListController.addToEntireRestaurantList(restaurant);
    };

    const addRestaurantForm = new AddRestaurantForm({
      cancelFunc: this.closeModal,
      submitFunc: submitFunc.bind(this),
    });

    return addRestaurantForm;
  }

  static #createRestaurantDetailButtonDiv() {
    const div = document.createElement("div");

    const deleteButton = new SubmitButton({
      value: "삭제하기",
      color: "white",
      eventListenerArgs: [
        [
          "click",
          (event) => {
            ModalController.closeModal();
            const nowRestaurantNameEl = document.querySelector(
              "#restaurant-detail--name"
            ) as HTMLElement;
            const nowRestaurantName = nowRestaurantNameEl?.textContent ?? "";
            RestaurantListController.deleteRestaurantInEntireRestaurant(
              nowRestaurantName
            );
            RenderController.renderRestaurantListUl();
          },
        ],
      ],
    });

    const closeButton = new SubmitButton({
      value: "닫기",
      color: "orange",
      eventListenerArgs: [
        [
          "click",
          () => {
            ModalController.closeModal();
          },
        ],
      ],
    });

    div.append(deleteButton.element, closeButton.element);

    div.classList.add("button-container");
    return div;
  }
}

export default ModalController;
