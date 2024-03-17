import generateHeaderComponent from '../../uiUtils/generateHeaderComponent';
import {
  HEADER_COMPONENT_DATA,
  HEADER_H1_COMPONENT_DATA,
  HEADER_BUTTON_COMPONENT_DATA,
  HEADER_BUTTON_IMAGE_COMPONENT_DATA,
} from './componentsData/headerComponentData';
import generateHeadingComponent from '../../uiUtils/generateHeadingComponent';
import generateButtonComponent from '../../uiUtils/generateButtonComponent';
import generateImageComponent from '../../uiUtils/generateImageComponent';

const generateElementComponents = () => {
  const headerContainer = generateHeaderComponent(HEADER_COMPONENT_DATA);
  const h1Component = generateHeadingComponent(HEADER_H1_COMPONENT_DATA);
  const buttonComponent = generateButtonComponent(HEADER_BUTTON_COMPONENT_DATA);
  const buttonImageComponent = generateImageComponent(HEADER_BUTTON_IMAGE_COMPONENT_DATA);
  buttonComponent.appendChild(buttonImageComponent);

  return { headerContainer, h1Component, buttonComponent };
};

const renderHeaderComponent = () => {
  const fragment = document.createDocumentFragment();
  const { headerContainer, h1Component, buttonComponent } = generateElementComponents();

  fragment.appendChild(h1Component);
  fragment.appendChild(buttonComponent);

  headerContainer.appendChild(fragment);
  document.body.appendChild(headerContainer);
};

export default renderHeaderComponent;
