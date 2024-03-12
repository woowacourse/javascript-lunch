import { inputRestaurantLinkHandler } from './eventHandlers';
import { renderBaseLinkComponents, renderLinkComponents } from './renderHandlers';

function InputLink(form: Element) {
  renderBaseLinkComponents(form);
  renderLinkComponents();

  inputRestaurantLinkHandler();
}

export default InputLink;
