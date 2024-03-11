import BaseComponent from "../components/BaseComponent/BaseComponent";

import { CustomEventListenerDictionary } from "../components/BaseComponent/BaseComponent.type";

import { $ } from "./dom";
import { createOptionElements } from "./createOptionElements";

interface DropdownConfig<T> {
  name: string;
  id: string;
  className: string;
  options: {contents: string[], values: T[]};
  eventType: string;
  eventHandler: (event: Event) => void;
}

class Dropdown<T> extends BaseComponent {
  private config: DropdownConfig<T>;

  // NOTE: 드롭다운 기본 이벤트는 change 이벤트
  private eventListeners: CustomEventListenerDictionary = {
    dropdownChange: {
      eventName: "change",
      eventHandler: this.handleChange.bind(this),
    },
  };

  constructor(config: DropdownConfig<T>) {
    super();
    this.config = config;
  }

  public getInnerHTML(): string {
    const { name, id, className, options } = this.config;

    return `
            <select name="${name}" id="${id}" class="${className}">
              ${createOptionElements(options)}
            </select>
        `;
  }

  private handleChange(event: Event): void {
    const targetElement = event?.target;

    if (targetElement instanceof HTMLSelectElement) {
      const selectedOption = targetElement.value;

      this.emit(this.config.eventType, selectedOption);
    }
  }

  public setEvent(): void {
    this.on({
      ...this.eventListeners.dropdownChange,
      target: $(`#${this.config.id}`),
    });
  }

  public removeEvent(): void {
    this.off({
      ...this.eventListeners.dropdownChange,
      target: $(`#${this.config.id}`),
    });
  }
}

customElements.define("dropdown-default", Dropdown);

export default Dropdown;
