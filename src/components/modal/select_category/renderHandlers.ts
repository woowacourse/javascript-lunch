import SELECT_CATEGORY_LABEL_COMPONENT_DATA from '../../../constants/SelectCategoryLabelComponentData';
import SELECT_CATEGORY_COMPONENT_DATA from '../../../constants/SelectCategoryComponentData';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';
import selectCategoryTemplate from './selectCategoryTemplate';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';

export const renderBaseSelectCategoryComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));
};

export const renderSelectCategoryLabelComponent = () => {
  const formItem = document.getElementsByClassName('form-item')[0];

  formItem.appendChild(generateLabelComponent(SELECT_CATEGORY_LABEL_COMPONENT_DATA));
  formItem.appendChild(generateSelectComponent(SELECT_CATEGORY_COMPONENT_DATA));
};
