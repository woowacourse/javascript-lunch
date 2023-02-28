import CustomElement from "../abstracts/CustomElement";

class ButtonComponent extends CustomElement {
  template() {
    return `
    <button type="button" text-caption">취소하기</button>
    `;
  }
}

customElements.define("button-element", ButtonComponent);

export default ButtonComponent;
