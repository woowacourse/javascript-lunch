import AddRestaurantForm from "../view/components/AddRestaurantForm/AddRestaurantForm";
import FORM_ITEM_TEXTS from "../constants/formItemTexts";
import Modal from "../view/components/Modal/Modal";
import RenderController from "./RenderController";
import RestaurantListController from "./RestaurantListController";
import createElementByTag from "../view/utils/createElementByTag";

class ModalController {
  static #addRestaurantTitle = createElementByTag({
    tag: "h2",
    classes: ["modal-title", "text-title"],
    contents: FORM_ITEM_TEXTS.formTitle,
  });

  static #addRestaurantForm = this.#createAddRestaurantForm();

  static #restaurantModalItem: any;

  static modal = this.#createModal();

  static changeIntoAddRestaurantForm() {
    this.modal.replaceContents([
      this.#addRestaurantTitle,
      this.#addRestaurantForm.element,
    ]);
  }

  static changeIntoRestaurantItem(restaurantItem: HTMLElement) {
    const restaurantModalItem = this.#getRestaurantModalItem(restaurantItem);
    this.modal.replaceContents([restaurantModalItem]);
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

  static #getRestaurantModalItem(restaurantItem: HTMLElement) {
    const cloneRestaurantItemObject =
      this.#getCloneRestaurantItemObject(restaurantItem);

    this.#setClassAtRestaurantModalItem(cloneRestaurantItemObject);

    const { icon, name, distance, description, url } =
      cloneRestaurantItemObject;

    const restaurantModalItem = document.createElement("section");

    restaurantModalItem.append(icon, name, distance, description, url);

    return restaurantModalItem;
  }

  static #getCloneRestaurantItemObject(restaurantItem: HTMLElement) {
    const icon = restaurantItem
      .querySelector(".restaurant__category")
      ?.cloneNode(true) as HTMLElement;
    const name = restaurantItem
      .querySelector(".restaurant__name")
      ?.cloneNode(true) as HTMLElement;
    const distance = restaurantItem
      .querySelector(".restaurant__distance")
      ?.cloneNode(true) as HTMLElement;
    const description = restaurantItem
      .querySelector(".restaurant__description")
      ?.cloneNode(true) as HTMLElement;
    const url = restaurantItem
      .querySelector(".restaurant__link")
      ?.cloneNode(true) as HTMLAnchorElement;

    url.href = url.textContent ?? "";

    return { icon, name, distance, description, url };
  }

  static #setClassAtRestaurantModalItem(restaurantItemElementObject: {
    icon: HTMLElement;
    name: HTMLElement;
    distance: HTMLElement;
    description: HTMLElement;
    url: HTMLElement;
  }) {
    restaurantItemElementObject.name.classList.add("text-title");
    restaurantItemElementObject.name.classList.remove("text-subtitle");
    restaurantItemElementObject.url.classList.remove("restaurant__link");

    console.log(restaurantItemElementObject.url);

    return restaurantItemElementObject;
  }
}

export default ModalController;
