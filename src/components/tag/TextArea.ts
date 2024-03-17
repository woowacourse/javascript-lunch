import TextAreaProps from './props/TextAreaProps';

class TextArea extends HTMLTextAreaElement {
  constructor(props: TextAreaProps) {
    super();

    const { name, id, cols, rows } = props;
    this.name = name;
    this.id = id;
    this.cols = cols;
    this.rows = rows;
  }

  getValue(): string {
    return this.value.split('\n').join('<br>');
  }
}

customElements.define('matzip-textarea', TextArea, { extends: 'textarea' });

export default TextArea;
