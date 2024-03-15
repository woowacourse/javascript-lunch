import BaseComponent from "../../BaseComponent/BaseComponent";

class CommonFormItem extends BaseComponent {
  protected render(): void {
    const labelTarget = this.getAttribute("for") ?? "";
    const classList = this.getAttribute("classList") ?? "";
    const labelText = this.getAttribute("labelText") ?? "";

    const children = this.innerHTML;

    this.innerHTML = /* html */ `
            <div class="form-item ${classList}">
                <label for="${labelTarget}" text-caption">${labelText}</label>
                ${children}
            </div>
        `;
  }
}

customElements.define("common-form-item", CommonFormItem);
