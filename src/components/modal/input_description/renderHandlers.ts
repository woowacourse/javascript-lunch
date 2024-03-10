import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';
import inputDescriptionTemplate from './inputDescriptionTemplate';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import DESCRIPTION_LABEL_COMPONENT_DATA from '../../../constants/DescriptionLabelComponentData';
import generateTextAreaComponent from '../../../uiUtils/generateTextAreaComponent';
import DESCRIPTION_TEXT_AREA_COMPONENT_DATA from '../../../constants/DescriptionTextAreaComponentData';
import generateSpanComponent from '../../../uiUtils/generateSpanComponent';
import DESCRIPTION_SPAN_COMPONENT_DATA from '../../../constants/DescriptionSpanComponentData';

export const renderBaseDescriptionComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));
};

export const renderDescriptionComponent = () => {
  const formItem = document.getElementsByClassName('form-item')[0];

  formItem.appendChild(generateLabelComponent(DESCRIPTION_LABEL_COMPONENT_DATA));
  formItem.appendChild(generateTextAreaComponent(DESCRIPTION_TEXT_AREA_COMPONENT_DATA));
  formItem.appendChild(generateSpanComponent(DESCRIPTION_SPAN_COMPONENT_DATA));
};
