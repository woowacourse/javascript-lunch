import { renderElement } from '../utils/dom.ts';

interface ModalCreator {
  modalContainer: string;
  modalContents: ModalContents;
  modalButton: ModalButton;
}

interface ModalContents {
  categorySelect: string;
  nameInput: string;
  distanceSelect: string;
  descriptionTextarea: string;
  linkInput: string;
}

interface ModalButton {
  addButton: string;
  cancelButton: string;
}

type ModalEventHandlers = ((event?: Event) => void)[];

const addRestaurantModal = {
  render({ modalContainer, modalContents, modalButton }: ModalCreator) {
    this.renderContainer(modalContainer);
    this.renderContents(modalContents);
    this.renderButton(modalButton);
  },

  renderContainer(container: string) {
    renderElement('main', container);

    const h2 = document.createElement('h2');
    h2.classList.add('modal-title', 'text-title');
    h2.textContent = '새로운 음식점';

    const form = document.createElement('form');
    form.id = 'new-restaurant-form';

    const selector = '.add-restaurant-modal > .modal-container';
    renderElement(selector, h2);
    renderElement(selector, form);
  },

  renderContents({ categorySelect, nameInput, distanceSelect, descriptionTextarea, linkInput }: ModalContents) {
    const selector = '#new-restaurant-form';

    renderElement(selector, categorySelect);
    renderElement(selector, nameInput);
    renderElement(selector, distanceSelect);
    renderElement(selector, descriptionTextarea);
    renderElement(selector, linkInput);
  },

  renderButton({ addButton, cancelButton }: ModalButton) {
    const selector = '#new-restaurant-form';
    const buttonDiv = document.createElement('div');
    buttonDiv.classList.add('button-container');

    renderElement(selector, buttonDiv);
    renderElement('.button-container', cancelButton);
    renderElement('.button-container', addButton);
  },

  setEvent(eventHandlers: ModalEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default addRestaurantModal;
