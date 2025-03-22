import { UIComponent } from "../../../../types";
import { LABEL_NAMES } from "../../../constants";

export default class LinkInput implements UIComponent {
  render(): HTMLDivElement {
    const $linkFormItem = document.createElement("div");
    $linkFormItem.className = "form-item";

    const $linkLabel = document.createElement("label");
    $linkLabel.setAttribute("for", "link text-caption");
    $linkLabel.textContent = LABEL_NAMES.link;

    const $linkInput = document.createElement("input");
    $linkInput.type = "text";
    $linkInput.setAttribute("name", "link");
    $linkInput.id = "link";

    const $linkHelpText = document.createElement("span");
    $linkHelpText.className = "help-text text-caption";
    $linkHelpText.textContent =
      "매장 정보를 확인할 수 있는 링크를 입력해 주세요.";

    $linkFormItem.append($linkLabel, $linkInput, $linkHelpText);

    return $linkFormItem;
  }
}
