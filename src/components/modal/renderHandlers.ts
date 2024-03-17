import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import {
  MODAL_COMPONENT_DATA,
  MODAL_BACK_DROP_COMPONENT_DATA,
  MODAL_CONTAINER_COMPONENT_DATA,
} from './modalComponentsData/modalComponentData';

const generateBaseModalComponent = () => {
  const modal = generateContainerComponent(MODAL_COMPONENT_DATA);
  const modalBackDrop = generateContainerComponent(MODAL_BACK_DROP_COMPONENT_DATA);
  const modalContainer = generateContainerComponent(MODAL_CONTAINER_COMPONENT_DATA);

  modal.appendChild(modalBackDrop);
  modal.appendChild(modalContainer);

  return { modal, modalContainer };
};

const renderBaseModalContainer = (modalContents?: Element) => {
  const { modal, modalContainer } = generateBaseModalComponent();

  if (modalContents) {
    modalContainer.appendChild(modalContents);
  }

  document.body.appendChild(modal);
};

export default renderBaseModalContainer;
