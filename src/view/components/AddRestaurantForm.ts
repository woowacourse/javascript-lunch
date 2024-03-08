import generateSelectBox from "../generateComponent/generateSelectBox";
import generateButton from "../generateComponent/generateButton";
import FormItem from "./FormItem";
import createElementByTag from "../generateComponent/utils/createElementByTag";
import RestaurantList from "../../domain/RestaurantList";
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
    const categorySelectBoxInModal = generateSelectBox(
      ["한식", "중식", "일식", "아시안", "양식", "기타"],
      false
    );
    const categoryFormItem = new FormItem({
      subject: "카테고리",
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
      subject: "이름",
      readableElement: nameInput,
      isRequired: true,
    });
    return nameFormItem;
  }

  #createDistanceFormItem() {
    const distanceSelectBoxInModal = generateSelectBox(
      ["5", "10", "15", "20", "30"],
      false
    );

    const distanceFormItem = new FormItem({
      subject: "거리(도보 이동 시간)",
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
      subject: "설명",
      readableElement: descriptTextArea,
      description: "메뉴 등 추가 정보를 입력해 주세요",
    });

    return descriptionFormItem;
  }

  #createUrlFormItem() {
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.name = "link";
    urlInput.id = "link";

    const urlFormItem = new FormItem({
      subject: "참고 링크",
      readableElement: urlInput,
      description: "매장 정보를 확인할 수있는 링크를 입력해 주세요.",
    });

    return urlFormItem;
  }

  #createButtonDiv(hideModalFunc: () => void) {
    const buttonDiv = createElementByTag({
      tag: "div",
      classes: ["button-container"],
    });

    const cancelButton = generateButton({
      value: "취소하기",
      classes: "button button--secondary text-caption".split(" "),
      onclick: (e) => {
        e.preventDefault();
        hideModalFunc();
      },
    });
    cancelButton.type = "button";

    const addButton = generateButton({
      value: "추가하기",
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
