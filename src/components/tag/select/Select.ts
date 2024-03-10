import DOM from '../../../utils/DOM';
import { SelectProps } from '../select';
import { Option, OptionProps } from '../option';

const { insertElementsInTarget } = DOM;

class Select extends HTMLSelectElement {
  constructor(props: SelectProps) {
    super();
    const { name, id, classname, required, options } = props;

    this.name = name;
    this.id = id;
    if (classname !== undefined) this.classList.add(classname);
    this.required = required;
    this.addOptions(options);
  }

  addOptions(options: OptionProps[]) {
    const optionElements = options.map((option) => new Option(option));
    insertElementsInTarget(this, optionElements);
  }

  getValue(): string {
    return this.options[this.selectedIndex].value;
  }
}

customElements.define('matzip-select', Select, { extends: 'select' });

export default Select;
