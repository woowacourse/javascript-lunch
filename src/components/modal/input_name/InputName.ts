import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import inputNameHandler from './handlers';
import inputNameTemplate from './inputNameTemplate';

function InputName(form: Element) {
  form.appendChild(convertHTMLStringToDOM(inputNameTemplate));

  inputNameHandler();
}

export default InputName;
