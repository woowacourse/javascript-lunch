import {
  CATEGORY,
  DISTANCE,
  isCategory,
  isDistance,
} from "../../constants/selectOptions";

import FORM_ITEM_TEXTS from "../../constants/formItemTexts";
import FormItem from "./FormItem";
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
    this.#categoryFormItem = this.#createCategoryFormItem();
    this.#nameFormItem = this.#createNameFormItem();
    this.#distanceFormItem = this.#createDistanceFormItem();
    this.#descriptionFormItem = this.#createDescriptionFormItem();
    this.#urlFormItem = this.#createUrlFormItem();
  }

  getForm({
    handleClickCancelButton,
    handleClickAddButton,
  }: {
    handleClickCancelButton: () => void;
    handleClickAddButton: (newRestaurant: Restaurant) => void;
  }) {
    const form = document.createElement("form");
    form.append(
      this.#categoryFormItem.item,
      this.#nameFormItem.item,
      this.#distanceFormItem.item,
      this.#descriptionFormItem.item,
      this.#urlFormItem.item,
      this.#createButtonDiv({ handleClickCancelButton, handleClickAddButton })
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

  #createCategoryFormItem() {
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
    const DISTANCE_STRINGS = DISTANCE.map(String);

    const distanceSelectBoxInModal = generateSelectBox(DISTANCE_STRINGS, false);

    const distanceFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.distanceTitle,
      readableElement: distanceSelectBoxInModal,
      isRequired: true,
    });

    return distanceFormItem;
  }

  #createDescriptionFormItem() {
    const descriptionTextArea = document.createElement("textarea");
    descriptionTextArea.name = "description";
    descriptionTextArea.id = "description";
    descriptionTextArea.cols = 30;
    descriptionTextArea.rows = 5;

    const descriptionFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.descriptionTitle,
      readableElement: descriptionTextArea,
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

  #createButtonDiv({
    handleClickCancelButton,
    handleClickAddButton,
  }: {
    handleClickCancelButton: () => void;
    handleClickAddButton: (newRestaurant: Restaurant) => void;
  }) {
    const buttonDiv = createElementByTag({
      tag: "div",
      classes: ["button-container"],
    });

    const addButton = this.#createAddButton(handleClickAddButton);
    const cancelButton = this.#createCancelButton(handleClickCancelButton);
    cancelButton.type = "button";

    buttonDiv.append(cancelButton, addButton);
    return buttonDiv;
  }

  #createCancelButton(handleClickCancelButton: () => void) {
    return generateButton({
      value: FORM_ITEM_TEXTS.cancelButton,
      classes: "button button--secondary text-caption".split(" "),
      onclick: handleClickCancelButton,
    });
  }

  #createAddButton(handleClickAddButton: (newRestaurant: Restaurant) => void) {
    return generateButton({
      value: FORM_ITEM_TEXTS.addButton,
      classes: "button button--primary text-caption".split(" "),
      onclick: () => {
        const newRestaurant = this.#getValues();
        handleClickAddButton(newRestaurant);
      },
    });
  }

  #getValues() {
    const category = this.#categoryFormItem.getValue();
    const distance = Number(this.#distanceFormItem.getValue());

    if (!(isCategory(category) && isDistance(distance))) {
      throw new Error("[ERROR] Category or Distance is Invalid");
    }

    return {
      name: this.#nameFormItem.getValue(),
      category,
      distance,
      description: this.#descriptionFormItem.getValue(),
      url: this.#urlFormItem.getValue(),
    };
  }
}

export default AddRestaurantForm;
