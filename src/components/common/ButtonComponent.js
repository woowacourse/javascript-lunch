import CustomElement from "../../abstracts/CustomElement";

class ButtonComponent extends CustomElement {
  template() {
    const btnType = this.getAttribute("btnType");
    const btnClass = this.getAttribute("btnClass");
    const btnText = this.getAttribute("btnText");

    return `
    <button type="${btnType}" class="button ${btnClass} text-caption">${btnText}</button>
    `;
  }
}
customElements.define("button-element", ButtonComponent);

export default ButtonComponent;
