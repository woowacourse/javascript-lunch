import BaseComponent from "../../abstract/BaseComponent";

export default class FormItem extends BaseComponent {
  protected getTemplate(): string {
    const labelFor = this.getAttribute("label-for");
    const title = this.getAttribute("title");
    const required = this.getAttribute("required");
    const helpText = this.getAttribute("help-text");

    const children = this.innerHTML;

    return `
      <div class="form-item${required ? " form-item--required" : ""}">
        <label for="${labelFor} text-caption">${title}</label>
        ${children}
        ${
          helpText
            ? `<span class="help-text text-caption">${helpText}</span>`
            : ""
        }
      </div>
    `;
  }

  static get observedAttributes() {
    return ["title", "required", "help-text", "label-for"];
  }
}
