import BaseComponent from "../../abstract/BaseComponent";

export default class FormItem extends BaseComponent {
  protected getTemplate(): string {
    const id = this.getAttribute("id");
    const title = this.getAttribute("title");
    const required = this.getAttribute("required");
    const noti = this.getAttribute("noti");

    const children = this.innerHTML;

    return `
      <div class="form-item${required ? " form-item--required" : ""}">
        <label for="${id} text-caption">${title}</label>
        ${children}
        ${noti ? `<span class="help-text text-caption">${noti}</span>` : ""}
      </div>
    `;
  }

  static get observedAttributes() {
    return ["title", "required", "noti", "id"];
  }
}
