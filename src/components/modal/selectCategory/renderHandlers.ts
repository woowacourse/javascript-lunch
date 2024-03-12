import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';
import SELECT_CATEGORY_COMPONENT_DATA from '../../filterBar/componentsData/SelectCategoryComponentData';
import SELECT_CATEGORY_LABEL_COMPONENT_DATA from '../../filterBar/componentsData/SelectCategoryLabelComponentData';

import selectCategoryTemplate from './selectCategoryTemplate';

export const renderBaseSelectCategoryComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(selectCategoryTemplate));
};

export const renderSelectCategoryLabelComponent = () => {
  const categoryContainer = document.getElementsByClassName('category-container')[0];

  categoryContainer.appendChild(generateLabelComponent(SELECT_CATEGORY_LABEL_COMPONENT_DATA));
  categoryContainer.appendChild(generateSelectComponent(SELECT_CATEGORY_COMPONENT_DATA));
};
