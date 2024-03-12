import inputDescriptionHandler from './eventHandlers';
import { renderBaseDescriptionComponent, renderDescriptionComponent } from './renderHandlers';

function InputDescription(form: Element) {
  renderBaseDescriptionComponent(form);
  renderDescriptionComponent();

  inputDescriptionHandler();
}

export default InputDescription;
