import { renderElement, selectElements } from '../utils/dom.ts';

interface ItemsControllerCreator {
  categoryFilter: string;
  sortSelector: string;
}

type ItemsControllerEventHandlers = ((event?: Event) => void)[];

const itemsController = {
  render({ categoryFilter, sortSelector }: ItemsControllerCreator) {
    const div = document.createElement('div');
    div.classList.add('items-controller');
    renderElement('.tab-container', div, 'afterend');

    renderElement('.items-controller', categoryFilter);
    renderElement('.items-controller', sortSelector);
  },

  setEvent(eventHandlers: ItemsControllerEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default itemsController;
