import { inputLinkHandler } from './eventHandlers';
import { renderBaseLinkComponents, renderLinkComponents } from './renderHandlers';

function InputLink(form: Element) {
  renderBaseLinkComponents(form);
  renderLinkComponents();

  inputLinkHandler();
}

export default InputLink;
