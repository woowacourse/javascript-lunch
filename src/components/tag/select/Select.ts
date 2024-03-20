import DOM from '../../../utils/DOM';
import { SelectProps } from '../select';
import { Option, OptionProps } from '../option';
import './select.css';

const { insertElementsInTarget } = DOM;

class Select extends HTMLSelectElement {
  constructor(props: SelectProps) {
    super();
    const { name, id, classname, required, options, onChange } = props;

    this.name = name;
    this.id = id;
    if (classname !== undefined) this.classList.add(classname);
    this.required = required;
    this.addOptions(options);
    if (onChange) this.addEventListener('change', onChange);
  }

  addOptions(options: OptionProps[]) {
    const optionElements = options.map((option) => new Option(option));
    insertElementsInTarget(this, optionElements);
  }

  getValue(): string {
    return this.options[this.selectedIndex].value;
  }

  isValidate() {
    return this.validity.valid;
  }
}

customElements.define('matzip-select', Select, { extends: 'select' });

export default Select;
