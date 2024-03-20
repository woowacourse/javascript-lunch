import { Caption, CaptionProps } from '../tag/caption';
import { Input, InputProps } from '../tag/input';
import { Label, LabelProps } from '../tag/label';
import { Select, SelectProps } from '../tag/select';
import { TextArea, TextAreaProps } from '../tag/textarea';
import './formItem.css';

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
    const { label, select, caption, input, textarea } = props;
    this.createLabel(label);
    this.createSelect(select);
    this.createInput(input);
    this.createTextArea(textarea);
    this.createCaption(caption);
  }

  createLabel(label: LabelProps) {
    this.appendChild(new Label(label));
  }

  createSelect(select?: SelectProps) {
    if (select === undefined) return;
    this.appendChild(new Select(select));
  }

  createInput(input?: InputProps) {
    if (input === undefined) return;
    this.appendChild(new Input(input));
  }

  createTextArea(textarea?: TextAreaProps) {
    if (textarea === undefined) return;
    this.appendChild(new TextArea(textarea));
  }

  createCaption(caption?: CaptionProps) {
    if (caption === undefined) return;
    this.appendChild(new Caption(caption));
  }
}

customElements.define('matzip-formitem', FormItem, { extends: 'div' });

export default FormItem;
