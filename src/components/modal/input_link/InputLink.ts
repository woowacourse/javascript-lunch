import { inputLinkHandler } from './handlers';
import { renderBaseComponents, renderLinkComponents } from './renderHandlers';

function InputLink(form: Element) {
  renderBaseComponents(form);
  renderLinkComponents();

  inputLinkHandler();
}

export default InputLink;
