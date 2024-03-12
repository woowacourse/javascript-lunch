import inputNameHandler from './eventHandlers';
import { renderBaseComponents, renderInputComponents } from './renderHandlers';

function InputName(form: Element) {
  renderBaseComponents(form);
  renderInputComponents();

  inputNameHandler();
}

export default InputName;
