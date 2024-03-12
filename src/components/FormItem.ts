import { Label, Select, Caption, Input, TextArea } from './tag';
import { LabelProps, SelectProps, CaptionProps, InputProps, TextAreaProps } from './tag/props';

interface FormItemProps {
  required: boolean;
  label: LabelProps;
  select?: SelectProps;
  input?: InputProps;
  textarea?: TextAreaProps;
  caption?: CaptionProps;
}

class FormItem extends HTMLDivElement {
  constructor(props: FormItemProps) {
    const { required } = props;
    super();
    this.classList.add('form-item');
    if (required) this.classList.add('form-item--required');

    this.createElements(props);
  }

  createElements(props: FormItemProps) {
    const frag = document.createDocumentFragment();
    const { label, select, caption, input, textarea } = props;
    this.createLabel(frag, label);
    this.createSelect(frag, select);
    this.createInput(frag, input);
    this.createTextArea(frag, textarea);
    this.createCaption(frag, caption);

    this.appendChild(frag);
  }

  createLabel(frag: DocumentFragment, label: LabelProps) {
    frag.appendChild(new Label(label));
  }

  createSelect(frag: DocumentFragment, select?: SelectProps) {
    if (select === undefined) return;
    frag.appendChild(new Select(select));
  }

  createInput(frag: DocumentFragment, input?: InputProps) {
    if (input === undefined) return;
    frag.appendChild(new Input(input));
  }

  createTextArea(frag: DocumentFragment, textarea?: TextAreaProps) {
    if (textarea === undefined) return;
    frag.appendChild(new TextArea(textarea));
  }

  createCaption(frag: DocumentFragment, caption?: CaptionProps) {
    if (caption === undefined) return;
    frag.appendChild(new Caption(caption));
  }
}

customElements.define('matzip-formitem', FormItem, { extends: 'div' });

export default FormItem;
