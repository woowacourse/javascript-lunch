import $template from './index.html';

interface Props<T> {
  options: T[];
  onChange: (option: T) => void;
}

class SelectBox<T extends string> extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  setProps({ options, onChange }: Props<T>) {
    this.render({ options });
    this.setHandleChange({ onChange });
  }

  render({ options }: Pick<Props<T>, 'options'>) {
    const $optionContainer = this.querySelector('#category-filter') as HTMLSelectElement;
    const $options = options.map((option) => `<option value=${option}>${option}</option>`).join('');

    $optionContainer.innerHTML = $options;
  }

  setHandleChange({ onChange }: Pick<Props<T>, 'onChange'>) {
    this.addEventListener('change', (e) => {
      if (!(e.target instanceof HTMLSelectElement)) return;
      onChange(e.target.value as T);
    });
  }
}

export default SelectBox;
