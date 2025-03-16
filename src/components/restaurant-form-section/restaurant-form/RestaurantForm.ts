import Button from "../../common/button/Button.js";
import LinkInput from "../link-input/LinkInput.js";
import NameInput from "../name-input/NameInput.js";
import DescriptionInput from "../description-input/DescriptionInput.js";
import SelectBox from "../../common/select-box/SelectBox.js";
import "./restaurantForm.css";
import {
  CATEGORY,
  DISTANCE,
  EVENT_TYPES,
  BUTTON_TEXTS,
  BUTTON_TYPES,
} from "../../../constants/constants.js";
import { Restaurant } from "../../../../types/interfaces.js";

type SubmitCallback = (
  newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite">
) => void;
type CancelCallback = () => void;

interface RestaurantFormProps {
  title: string;
  onSubmit: SubmitCallback;
  onCancel: CancelCallback;
}

interface FormElements {
  category: HTMLDivElement;
  name: HTMLDivElement;
  distance: HTMLDivElement;
  description: HTMLDivElement;
  link: HTMLDivElement;
}

export default class RestaurantForm {
  private title: RestaurantFormProps["title"];
  private onSubmit: RestaurantFormProps["onSubmit"];
  private onCancel: RestaurantFormProps["onCancel"];
  private formElements: FormElements;

  constructor({ title, onSubmit, onCancel }: RestaurantFormProps) {
    this.title = title;
    this.onSubmit = onSubmit;
    this.onCancel = onCancel;

    this.formElements = {
      category: new SelectBox({
        label: "category",
        options: CATEGORY.slice(1, CATEGORY.length),
      }).render(),
      name: new NameInput().render(),
      distance: new SelectBox({
        label: "distance",
        options: DISTANCE,
      }).render(),
      description: new DescriptionInput().render(),
      link: new LinkInput().render(),
    };
  }

  render() {
    const $fragment = new DocumentFragment();

    const $title = this.#renderTitle();
    const $form = this.#renderForm();

    $fragment.append($title, $form);

    return $fragment;
  }

  #renderTitle() {
    const $title = document.createElement("h2");
    $title.className = "modal-title text-title";
    $title.textContent = this.title;

    return $title;
  }

  #renderForm() {
    const $form = document.createElement("form");

    const $buttonContainer = document.createElement("div");
    $buttonContainer.className = "button-container";

    const $cancelButton = new Button({
      text: BUTTON_TEXTS.cancel,
      action: BUTTON_TYPES.cancel,
    }).render();

    const $addButton = new Button({
      type: "submit",
      text: BUTTON_TEXTS.add,
      action: BUTTON_TYPES.add,
    }).render();

    $buttonContainer.append($cancelButton, $addButton);
    $form.append(
      this.formElements.category,
      this.formElements.name,
      this.formElements.distance,
      this.formElements.description,
      this.formElements.link,
      $buttonContainer
    );

    $cancelButton.addEventListener(EVENT_TYPES.click, this.onCancel.bind(this));
    $form.addEventListener(EVENT_TYPES.submit, this.#handleSubmit.bind(this));

    return $form;
  }

  #handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const newRestaurantInfo: Omit<Restaurant, "id" | "isFavorite"> =
      this.#getFormData();

    this.onSubmit(newRestaurantInfo);
    this.#resetFormData();
  }

  #getInputValue<K extends keyof Omit<Restaurant, "id" | "isFavorite">>(
    key: K
  ): Restaurant[K] {
    const element = this.formElements[key];
    if (!element) {
      return "" as Restaurant[K];
    }

    const selectorMap = {
      category: "select",
      name: "input",
      distance: "select",
      description: "textarea",
      link: "input",
    } as Record<K, string>;

    const el = element.querySelector(selectorMap[key]);

    if (
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ) {
      return (el.value ?? "") as Restaurant[K];
    }

    return "" as Restaurant[K];
  }

  #getFormData(): Omit<Restaurant, "id" | "isFavorite"> {
    return {
      category: this.#getInputValue("category"),
      name: this.#getInputValue("name"),
      distance: this.#getInputValue("distance"),
      description: this.#getInputValue("description"),
      link: this.#getInputValue("link"),
    };
  }

  #resetFormData() {
    Object.values(this.formElements).forEach((el) => {
      const query = el.querySelector("input, select, textarea");
      if (query) query.value = "";
    });
  }
}
