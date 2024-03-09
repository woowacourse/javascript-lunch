import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import { distanceChange } from './handlers';
import selectDistanceTemplate from './selectDistanceTemplate';

function SelectDistance(form: Element) {
  form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));

  distanceChange();
}

export default SelectDistance;
