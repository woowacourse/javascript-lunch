import EventComponent from "../../abstract/EventComponent";

import { $ } from "../../utils/selector";

interface Option {
  value: string;
  label: string;
}

export default class SelectBox extends EventComponent {
  protected getTemplate(): string {
    const rawOptions = this.getAttribute("options");
    const selectId = this.getAttribute("select-id") || "";
    const className = this.getAttribute("class-name") || "";
    const name = this.getAttribute("name") || "";
    const required = this.getAttribute("required") || "";

    const options = rawOptions ? (JSON.parse(rawOptions) as Option[]) : [];

    return `
      <select id=${selectId} class=${className} name=${name} ${
      required ? "required" : ""
    }>
        ${options.map(
          ({ value, label }) => `<option value=${value}>${label}</option>`
        )}
      </select>
    `;
  }

  private handleSelectChange(e: Event, eventName: string) {
    const select = e.target as HTMLSelectElement;
    const selectedValue = select.value;

    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail: { value: selectedValue },
        bubbles: true,
      })
    );
  }

  protected setEvent(): void {
    const eventName = this.getAttribute("event-name") || "";
    const selectId = this.getAttribute("select-id") || "";

    $(`#${selectId}`)?.addEventListener("change", (e) =>
      this.handleSelectChange(e, eventName)
    );
  }

  static get observedAttributes() {
    return [
      "options",
      "event-name",
      "select-id",
      "class-name",
      "name",
      "required",
    ];
  }
}
