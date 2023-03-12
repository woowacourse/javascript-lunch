import CustomFormElement from '../CustomFormElement';

class Input extends CustomFormElement {
  override renderTemplate(): string {
    return `<input>`;
  }
}

customElements.define('r-input', Input);

export default Input;
