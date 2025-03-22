import { UIComponent } from "./../../../../types/index";
import { LABEL_NAMES } from "../../../constants";

export default class DescriptionInput implements UIComponent {
  render(): HTMLDivElement {
    const $descriptionFormItem = document.createElement("div");
    $descriptionFormItem.className = "form-item";

    const $descriptionLabel = document.createElement("label");
    $descriptionLabel.setAttribute("for", "description text-caption");
    $descriptionLabel.textContent = LABEL_NAMES.description;

    const $descriptionTextarea = document.createElement("textarea");
    $descriptionTextarea.id = "description";
    $descriptionTextarea.setAttribute("name", "description");
    $descriptionTextarea.setAttribute("cols", "30");
    $descriptionTextarea.setAttribute("rows", "5");

    const $descriptionHelpText = document.createElement("span");
    $descriptionHelpText.className = "help-text text-caption";
    $descriptionHelpText.textContent = "메뉴 등 추가 정보를 입력해 주세요.";

    $descriptionFormItem.append(
      $descriptionLabel,
      $descriptionTextarea,
      $descriptionHelpText
    );

    return $descriptionFormItem;
  }
}
