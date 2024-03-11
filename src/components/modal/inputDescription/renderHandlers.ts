import DESCRIPTION_LABEL_COMPONENT_DATA from './componentsData/DescriptionLabelComponentData';
import DESCRIPTION_SPAN_COMPONENT_DATA from './componentsData/DescriptionSpanComponentData';
import DESCRIPTION_TEXT_AREA_COMPONENT_DATA from './componentsData/DescriptionTextAreaComponentData';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSpanComponent from '../../../uiUtils/generateSpanComponent';
import generateTextAreaComponent from '../../../uiUtils/generateTextAreaComponent';
import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';

import inputDescriptionTemplate from './inputDescriptionTemplate';

export const renderBaseDescriptionComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(inputDescriptionTemplate));
};

export const renderDescriptionComponent = () => {
  const descriptionContainer = document.getElementsByClassName('description-container')[0];

  descriptionContainer.appendChild(generateLabelComponent(DESCRIPTION_LABEL_COMPONENT_DATA));
  descriptionContainer.appendChild(generateTextAreaComponent(DESCRIPTION_TEXT_AREA_COMPONENT_DATA));
  descriptionContainer.appendChild(generateSpanComponent(DESCRIPTION_SPAN_COMPONENT_DATA));
};
