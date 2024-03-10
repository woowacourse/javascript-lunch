import LINK_INPUT_COMPONENT_DATA from '../../../constants/LinkInputComponentData';
import LINK_LABEL_COMPONENT_DATA from '../../../constants/LinkLabelComponentData';
import LINK_SPAN_COMPONENT_DATA from '../../../constants/LinkSpanComponentData';
import generateInputComponent from '../../../uiUtils/generateInputComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSpanComponent from '../../../uiUtils/generateSpanComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import inputLinkTemplate from './inputLinkTemplate';

export const renderBaseLinkComponents = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputLinkTemplate));
};

export const renderLinkComponents = () => {
  const formContainer = document.getElementsByClassName('form-item')[0];

  formContainer.appendChild(generateLabelComponent(LINK_LABEL_COMPONENT_DATA));
  formContainer.appendChild(generateInputComponent(LINK_INPUT_COMPONENT_DATA));
  formContainer.appendChild(generateSpanComponent(LINK_SPAN_COMPONENT_DATA));
};
