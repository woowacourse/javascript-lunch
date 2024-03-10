import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';
import inputDescriptionTemplate from './inputDescriptionTemplate';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import DESCRIPTION_LABEL_COMPONENT_DATA from '../../../constants/DescriptionLabelComponentData';

export const renderBaseDescriptionComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));
};

export const renderDescriptionComponent = () => {
  const formItem = document.getElementsByClassName('form-item')[0];

  formItem.appendChild(generateLabelComponent(DESCRIPTION_LABEL_COMPONENT_DATA));
};
