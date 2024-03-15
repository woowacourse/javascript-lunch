import BaseComponent from "../../BaseComponent/BaseComponent";

import { $ } from "../../../utils/dom";
import { createOptionElements } from "../../../utils/createOptionElements";
import { isCustomEventType } from "../../../utils/typeGuard";

import { CUSTOM_EVENT_TYPE } from "../../../constants/eventType";

class CommonDropdown extends BaseComponent {
  private eventListeners = {
    dropDown: {
      eventName: "change",
      eventHandler: this.handleChange.bind(this),
    },
  } as const;

  protected render(): void {
    const id = this.getAttribute("id");
    const classList = this.getAttribute("classList");
    const name = this.getAttribute("name");

    const options = this.getAttribute("options")?.split(",");
    const title = this.getAttribute("title");
    const addOptionText = this.getAttribute("addOptionText");

    this.innerHTML = /* html */ `
        <select name="${name ?? ""}" id="${id}" class="${classList}">
            ${title ? `<option value="">${title}</option>` : ""}

            ${createOptionElements(
              options ?? [],
              addOptionText
                ? (value) => `${value}${addOptionText}`
                : (value) => value
            )}
        </select>
    `;
  }

  protected setEvent(): void {
    const target = this.getAttribute("target");

    if (!target) return;

    this.on({
      ...this.eventListeners.dropDown,
      target: $(target ?? "") ?? document,
    });
  }

  private handleChange(event: Event) {
    const eventType = this.getAttribute("eventType");

    if (!eventType || !isCustomEventType(eventType)) return;

    const targetElement = event?.target;

    if (!(targetElement instanceof HTMLSelectElement)) return;

    const value = targetElement.value;

    this.emit(CUSTOM_EVENT_TYPE[eventType], value);
  }

  protected removeEvent(): void {
    const target = this.getAttribute("target");

    if (!target) return;

    this.off({
      ...this.eventListeners.dropDown,
      target: $(target ?? "") ?? document,
    });
  }
}

customElements.define("common-dropdown", CommonDropdown);
