import { CATEGORY, DISTANCE } from "../../constants/selectOptions";

import FORM_ITEM_TEXTS from "../../constants/formItemTexts";
import FormItem from "./FormItem";
import RestaurantList from "../../domain/RestaurantList";
import createElementByTag from "../generateComponent/utils/createElementByTag";
import generateButton from "../generateComponent/generateButton";
import generateSelectBox from "../generateComponent/generateSelectBox";

class AddRestaurantForm {
  #categoryFormItem: FormItem;
  #nameFormItem: FormItem;
  #distanceFormItem: FormItem;
  #descriptionFormItem: FormItem;
  #urlFormItem: FormItem;

  constructor() {
    this.#categoryFormItem = this.#createcategoryFormItem();
    this.#nameFormItem = this.#createNameFormItem();
    this.#distanceFormItem = this.#createDistanceFormItem();
    this.#descriptionFormItem = this.#createDescriptionFormItem();
    this.#urlFormItem = this.#createUrlFormItem();
  }

  getForm({ hideModalFunc }: { hideModalFunc: () => void }) {
    const form = document.createElement("form");
    form.append(
      this.#categoryFormItem.item,
      this.#nameFormItem.item,
      this.#distanceFormItem.item,
      this.#descriptionFormItem.item,
      this.#urlFormItem.item,
      this.#createButtonDiv(hideModalFunc)
    );

    return form;
  }

  resetForms() {
    this.#categoryFormItem.resetForm();
    this.#nameFormItem.resetForm();
    this.#distanceFormItem.resetForm();
    this.#descriptionFormItem.resetForm();
    this.#urlFormItem.resetForm();
  }

  #createcategoryFormItem() {
    const categorySelectBoxInModal = generateSelectBox(CATEGORY, false);
    const categoryFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.categoryTitle,
      readableElement: categorySelectBoxInModal,
      isRequired: true,
    });

    return categoryFormItem;
  }

  #createNameFormItem() {
    const nameInput = document.createElement("input");
    nameInput.type = "text";
    nameInput.name = "name";
    nameInput.id = "name";
    nameInput.required = true;

    const nameFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.nameTitle,
      readableElement: nameInput,
      isRequired: true,
    });
    return nameFormItem;
  }

  #createDistanceFormItem() {
    const DISTANCE_STRINGS = DISTANCE.map((el) => el.toString());

    const distanceSelectBoxInModal = generateSelectBox(DISTANCE_STRINGS, false);

    const distanceFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.distanceTitle,
      readableElement: distanceSelectBoxInModal,
      isRequired: true,
    });
    return distanceFormItem;
  }

  #createDescriptionFormItem() {
    const descriptTextArea = document.createElement("textarea");

    descriptTextArea.name = "description";
    descriptTextArea.id = "description";
    descriptTextArea.cols = 30;
    descriptTextArea.rows = 5;

    const descriptionFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.descriptionTitle,
      readableElement: descriptTextArea,
      description: FORM_ITEM_TEXTS.descriptionDescription,
    });

    return descriptionFormItem;
  }

  #createUrlFormItem() {
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.name = "link";
    urlInput.id = "link";

    const urlFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.urlTitle,
      readableElement: urlInput,
      description: FORM_ITEM_TEXTS.urlDescription,
    });

    return urlFormItem;
  }

  #createButtonDiv(hideModalFunc: () => void) {
    const buttonDiv = createElementByTag({
      tag: "div",
      classes: ["button-container"],
    });

    const cancelButton = generateButton({
      value: FORM_ITEM_TEXTS.cancelButton,
      classes: "button button--secondary text-caption".split(" "),
      onclick: (e) => {
        e.preventDefault();
        hideModalFunc();
      },
    });
    cancelButton.type = "button";

    const addButton = generateButton({
      value: FORM_ITEM_TEXTS.addButton,
      classes: "button button--primary text-caption".split(" "),
      onclick: () => {
        const newRestaurant: Restaurant = {
          name: this.#nameFormItem.getValue(),
          category: this.#categoryFormItem.getValue() as Category,
          distance: Number(this.#distanceFormItem.getValue()) as Distance,
          description: this.#descriptionFormItem.getValue(),
          url: this.#urlFormItem.getValue(),
        };

        if (
          newRestaurant.name &&
          newRestaurant.category &&
          newRestaurant.distance
        ) {
          RestaurantList.add(newRestaurant);
        }
      },
    });

    buttonDiv.append(cancelButton, addButton);
    return buttonDiv;
  }
}

export default AddRestaurantForm;
