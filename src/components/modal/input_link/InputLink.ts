import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import { inputLinkHandler } from './handlers';
import inputLinkTemplate from './inputLinkTemplate';

function InputLink(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));

  inputLinkHandler();
}

export default InputLink;
