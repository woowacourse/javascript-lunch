import convertHTMLStringToDOM from '../../../utils/convertHTMLStringToDOM';
import selectDistanceTemplate from './selectDistanceTemplate';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import DISTANCE_LABEL_COMPONENT_DATA from '../../../constants/DistanceLabelComponentData';
import SELECT_DISTANCE_COMPONENT_DATA from '../../../constants/SelectDistanceComponentData';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';

export const renderBaseDistanceComponent = (form: Element) => {
  form.appendChild(convertHTMLStringToDOM(selectDistanceTemplate));
};

export const renderDistanceSelectComponent = () => {
  const formItem = document.getElementsByClassName('form-item')[0];

  formItem.appendChild(generateLabelComponent(DISTANCE_LABEL_COMPONENT_DATA));
  formItem.appendChild(generateSelectComponent(SELECT_DISTANCE_COMPONENT_DATA));
};
