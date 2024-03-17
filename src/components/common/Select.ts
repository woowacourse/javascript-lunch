import EventComponent from "../../abstract/EventComponent";

interface Option {
  value: string;
  label: string;
}

export default class Select extends EventComponent {
  protected eventHandlerRegistrations = [
    {
      target: `#${this.getAttribute("select-id") || ""}`,
      eventName: "change",
      handler: (e: Event) => this.handleSelectChange(e),
    },
  ];

  protected getTemplate(): string {
    const rawOptions = this.getAttribute("options");
    const selectId = this.getAttribute("select-id") || "";
    const className = this.getAttribute("class-name") || "";
    const name = this.getAttribute("name") || "";
    const required = this.getAttribute("required") || "";
    const labelName = this.getAttribute("label-name") || "";

    const options = rawOptions ? (JSON.parse(rawOptions) as Option[]) : [];

    return `
      <select id=${selectId} class=${className} name=${name} aria-label=${labelName} ${
      required ? "required" : ""
    }>
        ${options
          .map(({ value, label }) => `<option value=${value}>${label}</option>`)
          .join("")}
      </select>
    `;
  }

  private handleSelectChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    const selectedValue = select.value;

    this.dispatchCustomEvent(this.getAttribute("event-name") || "", {
      value: selectedValue,
    });
  }
}
