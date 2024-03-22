import { CATEGORY, DISTANCE } from "../../../constants/selectOptions";

import FORM_ITEM_TEXTS from "../../../constants/formItemTexts";
import FormItem from "./FormItem";
import createElementByTag from "../../utils/createElementByTag";
import generatePrimaryButton from "../Button/generatePrimaryButton";
import generateSecondaryButton from "../Button/generateSecondaryButton";
import generateSelectBox from "../ReadableElement/generateSelectBox";

class AddRestaurantForm {
  #categoryFormItem: FormItem;
  #nameFormItem: FormItem;
  #distanceFormItem: FormItem;
  #descriptionFormItem: FormItem;
  #linkFormItem: FormItem;

  constructor() {
    this.#categoryFormItem = this.#createCategoryFormItem();
    this.#nameFormItem = this.#createNameFormItem();
    this.#distanceFormItem = this.#createDistanceFormItem();
    this.#descriptionFormItem = this.#createDescriptionFormItem();
    this.#linkFormItem = this.#createLinkFormItem();
  }

  getForm({
    handleClickCancelButton,
    handleClickAddButton,
  }: {
    handleClickCancelButton: (e: Event) => void;
    handleClickAddButton: (e: Event) => void;
  }) {
    const form = document.createElement("form");
    form.append(
      this.#categoryFormItem.item,
      this.#nameFormItem.item,
      this.#distanceFormItem.item,
      this.#descriptionFormItem.item,
      this.#linkFormItem.item,
      this.#createButtonDiv({ handleClickCancelButton, handleClickAddButton })
    );

    return form;
  }

  resetForms() {
    this.#categoryFormItem.resetForm();
    this.#nameFormItem.resetForm();
    this.#distanceFormItem.resetForm();
    this.#descriptionFormItem.resetForm();
    this.#linkFormItem.resetForm();
  }

  #createCategoryFormItem() {
    const categorySelectBoxInModal = generateSelectBox({
      options: CATEGORY,
      hasDefaultOption: false,
      name: "category",
    });

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

    const distanceSelectBoxInModal = generateSelectBox({
      options: DISTANCE_STRINGS,
      hasDefaultOption: false,
      name: "distance",
    });

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

  #createLinkFormItem() {
    const linkInput = document.createElement("input");
    linkInput.type = "text";
    linkInput.name = "link";
    linkInput.id = "link";

    const linkFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.linkTitle,
      readableElement: linkInput,
      description: FORM_ITEM_TEXTS.linkDescription,
    });

    return linkFormItem;
  }

  #createButtonDiv({
    handleClickCancelButton,
    handleClickAddButton,
  }: {
    handleClickCancelButton: (e: Event) => void;
    handleClickAddButton: (e: Event) => void;
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

  #createCancelButton(handleClickCancelButton: (e: Event) => void) {
    return generateSecondaryButton({
      value: FORM_ITEM_TEXTS.cancelButton,
      onClickHandler: handleClickCancelButton,
    });
  }

  #createAddButton(handleClickAddButton: (e: Event) => void) {
    return generatePrimaryButton({
      value: FORM_ITEM_TEXTS.addButton,
      onClickHandler: handleClickAddButton,
    });
  }
}

export default AddRestaurantForm;
