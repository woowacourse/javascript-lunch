import { renderElement, selectElements } from '../utils/dom.ts';

interface TabCreator {
  totalItemsTab: string;
  frequentItemsTab: string;
}

type TabEventHandlers = ((event?: Event) => void)[];

const tab = {
  render({ totalItemsTab, frequentItemsTab }: TabCreator) {
    const div = document.createElement('div');
    div.classList.add('tab-container');
    renderElement('main', div, 'afterbegin');
    renderElement('.tab-container', totalItemsTab);
    renderElement('.tab-container', frequentItemsTab);

    const tabs = selectElements('.tab') as NodeListOf<HTMLElement>;
    ['all', 'favorite'].forEach((value, index) => {
      tabs[index].dataset.tab = value;
    });
  },

  setEvent(eventHandlers: TabEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default tab;
