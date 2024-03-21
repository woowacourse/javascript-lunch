import LabelProps from './LabelProps';
import './label.css';

class Label extends HTMLLabelElement {
  constructor(props: LabelProps) {
    super();
    const { htmlFor, text, classname } = props;
    this.htmlFor = htmlFor;
    this.textContent = text;
    this.classList.add(classname);
  }
}

customElements.define('matzip-label', Label, { extends: 'label' });

export default Label;
