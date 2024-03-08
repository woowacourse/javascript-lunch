import OptionProps from './props/OptionProps';

class Option extends HTMLOptionElement {
  constructor(props: OptionProps) {
    super();

    const { value, text } = props;
    this.value = value;
    this.textContent = text;
  }
}

customElements.define('matzip-option', Option, { extends: 'option' });

export default Option;
