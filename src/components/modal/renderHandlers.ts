import generateContainerComponent from '../../uiUtils/generateContainerComponent';
import MODAL_COMPONENT_DATA from './modalComponentsData/modalComponentData';
import MODAL_BACK_DROP_COMPONENT_DATA from './modalComponentsData/modalBackdropComponentData';
import MODAL_CONTAINER_COMPONENT_DATA from './modalComponentsData/modalContainerComponentData';

export const renderBaseModalContainer = (modalContents?: Element) => {
  const modal = generateContainerComponent(MODAL_COMPONENT_DATA);
  const modalBackDrop = generateContainerComponent(MODAL_BACK_DROP_COMPONENT_DATA);
  const modalContainer = generateContainerComponent(MODAL_CONTAINER_COMPONENT_DATA);

  if (modalContents) {
    modalContainer.appendChild(modalContents);
  }
  modal.appendChild(modalBackDrop);
  modal.appendChild(modalContainer);

  document.body.appendChild(modal);
};
