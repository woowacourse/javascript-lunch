import { UIComponent } from "./../../../../types/index";
import { Category, Distance, LabelKey } from "../../../../types";
import { LABEL_NAMES } from "../../../constants";

interface SelectBoxProps {
  label: Extract<LabelKey, "category" | "distance">;
  options: Category[] | Distance[];
}

export default class SelectBox implements UIComponent {
  private label: SelectBoxProps["label"];
  private options: SelectBoxProps["options"];

  constructor({ label, options }: SelectBoxProps) {
    this.label = label;
    this.options = options;
  }

  render(): HTMLDivElement {
    const $formItem = document.createElement("div");
    $formItem.className = "form-item form-item--required";

    const $label = document.createElement("label");
    $label.setAttribute("for", `${this.label} text-caption`);
    $label.textContent = LABEL_NAMES[this.label];

    const $select = document.createElement("select");
    $select.setAttribute("name", this.label);
    $select.required = true;
    $select.id = this.label;

    const $defaultOption = document.createElement("option");
    $defaultOption.value = "";
    $defaultOption.textContent = "선택해 주세요";

    $formItem.append($label, $select);
    $select.append($defaultOption);

    this.options.forEach((option) => {
      const $option = document.createElement("option");
      $option.value = option;

      if (this.label === "distance") $option.textContent = `${option}분 내`;
      else $option.textContent = option;

      $select.append($option);
    });

    return $formItem;
  }
}
