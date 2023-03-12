import CustomFormElement from '../CustomFormElement';

class Textarea extends CustomFormElement {
  renderTemplate(): string {
    return `<textarea rows="4"></textarea>`;
  }
}

customElements.define('r-textarea', Textarea);

export default Textarea;
