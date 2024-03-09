import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import { categoryChange } from './eventHandlers';
import selectCategoryTemplate from './selectCategoryTemplate';

function SelectCategory(form: Element) {
  form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));

  categoryChange();
}

export default SelectCategory;
