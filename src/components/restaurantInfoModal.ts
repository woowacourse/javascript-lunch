import { renderElement } from '../utils/dom.ts';

interface ModalCreator {
  modalContainer: string;
  modalButton: ModalButton;
}

interface ModalContents {
  id: number;
  restaurantsInfo: (id: number) => string;
}

interface ModalButton {
  deleteButton: string;
  closeButton: string;
}

type ModalEventHandlers = ((event?: Event) => void)[];

const restaurantInfoModal = {
  render({ modalContainer, modalButton }: ModalCreator) {
    this.renderContainer(modalContainer);
    this.renderButton(modalButton);
  },

  renderContainer(container: string) {
    renderElement('main', container);
  },

  renderContents({ id, restaurantsInfo }: ModalContents) {
    const contents = restaurantsInfo(id);

    const targetModal = document.querySelector('.restaurant-info-modal > .modal-container') as HTMLElement;
    const prevInformation = targetModal.querySelector('.restaurant');

    if (prevInformation) {
      targetModal.removeChild(prevInformation);
    }

    renderElement('.restaurant-info-modal > .modal-container', contents, 'afterbegin');
  },

  renderButton({ deleteButton, closeButton }: ModalButton) {
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container');

    buttonDiv.insertAdjacentHTML('beforeend', deleteButton);
    buttonDiv.insertAdjacentHTML('beforeend', closeButton);

    renderElement('.restaurant-info-modal > .modal-container', buttonDiv);
  },

  setEvent(eventHandlers: ModalEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default restaurantInfoModal;
