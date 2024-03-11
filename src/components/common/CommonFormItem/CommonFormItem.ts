import BaseComponent from "../../BaseComponent/BaseComponent";

class CommonFormItem extends BaseComponent {
  protected render(): void {
    const labelTarget = this.getAttribute("for") ?? "";
    const classList = this.getAttribute("classList") ?? "";
    const children = this.getAttribute("children") ?? null;
    const labelText = this.getAttribute("labelText") ?? "";

    this.innerHTML = `
            <div class="form-item ${classList}">
                <label for="${labelTarget}" text-caption">${labelText}</label>
                ${children}
            </div>
        `;
  }
}

customElements.define("common-form-item", CommonFormItem);
