import { CATEGORY, DISTANCE } from "../../../constants/selectOptions";

import FORM_ITEM_TEXTS from "../../../constants/formItemTexts";
import FormItem from "../FormItem/FormItem";
import SelectBox from "../SelectBox/SelectBox";
import SubmitButton from "../SubmitButton/SubmitButton";
import createElementByTag from "../../generateComponent/utils/createElementByTag";

class AddRestaurantForm {
  element = document.createElement("form");

  #categoryFormItem: FormItem = this.#createCategoryFormItem();
  #nameFormItem: FormItem = this.#createNameFormItem();
  #distanceFormItem: FormItem = this.#createDistanceFormItem();
  #descriptionFormItem: FormItem = this.#createDescriptionFormItem();
  #urlFormItem: FormItem = this.#createUrlFormItem();
  #buttonDiv: HTMLElement;

  #requiredFormItem = [
    this.#categoryFormItem,
    this.#nameFormItem,
    this.#descriptionFormItem,
  ];

  constructor({
    cancelFunc,
    submitFunc,
  }: {
    cancelFunc: (...args: any[]) => any;
    submitFunc: (...args: any[]) => any;
  }) {
    this.#categoryFormItem = this.#createCategoryFormItem();
    this.#nameFormItem = this.#createNameFormItem();
    this.#distanceFormItem = this.#createDistanceFormItem();
    this.#descriptionFormItem = this.#createDescriptionFormItem();
    this.#urlFormItem = this.#createUrlFormItem();
    this.#buttonDiv = this.#createButtonDiv(cancelFunc, submitFunc);

    this.#setElement();
  }

  #setElement() {
    this.element.append(
      this.#categoryFormItem.element,
      this.#nameFormItem.element,
      this.#distanceFormItem.element,
      this.#descriptionFormItem.element,
      this.#urlFormItem.element,
      this.#buttonDiv
    );
  }

  reset() {
    this.#categoryFormItem.reset();
    this.#nameFormItem.reset();
    this.#distanceFormItem.reset();
    this.#descriptionFormItem.reset();
    this.#urlFormItem.reset();
  }

  #createCategoryFormItem() {
    const categorySelectBox = new SelectBox(CATEGORY, false);
    const categoryFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.categoryTitle,
      readableElement: categorySelectBox.element as HTMLSelectElement,
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

    const distanceSelectBoxInModal = new SelectBox(DISTANCE_STRINGS, false);

    const distanceFormItem = new FormItem({
      subject: FORM_ITEM_TEXTS.distanceTitle,
      readableElement: distanceSelectBoxInModal.element as HTMLSelectElement,
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

  #createButtonDiv(
    cancelFunc: (...args: any[]) => any,
    addFunc: (...args: any[]) => any
  ) {
    const buttonDiv = createElementByTag({
      tag: "div",
      classes: ["button-container"],
    });

    const cancelButton = this.#createCancelButton(cancelFunc);
    const addButton = this.#createAddButton(addFunc);

    buttonDiv.append(cancelButton.element, addButton.element);
    return buttonDiv;
  }

  #createCancelButton(cancelFunc: (...args: any[]) => any) {
    const cancelButton = new SubmitButton({
      value: FORM_ITEM_TEXTS.cancelButton,
      color: "white",
      eventListenerArgs: [
        [
          "click",
          (e) => {
            e.preventDefault();
            cancelFunc();
          },
        ],
      ],
    });
    cancelButton.element.type = "button";

    return cancelButton;
  }

  #createAddButton(addFunc: (...args: any[]) => any) {
    return new SubmitButton({
      value: FORM_ITEM_TEXTS.addButton,
      color: "orange",
      eventListenerArgs: [
        [
          "submit",
          (e: Event) => {
            e.preventDefault();
            const newRestaurant = this.#getRestaurant();
            if (this.#isRequireFilled()) {
              this.reset();
              addFunc(newRestaurant);
            }
          },
        ],
      ],
    });
  }

  #getRestaurant() {
    return {
      name: this.#nameFormItem.getValue(),
      category: this.#categoryFormItem.getValue() as Category,
      distance: Number(this.#distanceFormItem.getValue()) as Distance,
      description: this.#descriptionFormItem.getValue(),
      url: this.#urlFormItem.getValue(),
    };
  }

  #isRequireFilled() {
    return this.#requiredFormItem.every(
      (formItem) => formItem.getValue() !== ""
    );
  }
}

export default AddRestaurantForm;
