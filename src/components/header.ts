import { renderElement } from '../utils/dom.ts';

interface HeaderElement {
  header: HTMLElement;
}

type HeaderEventHandlers = ((event?: Event) => void)[];

const header = {
  render({ header }: HeaderElement) {
    renderElement('#app', header, 'afterbegin');
  },

  setEvent(eventHandlers: HeaderEventHandlers) {
    eventHandlers.forEach((eventHandler) => {
      eventHandler();
    });
  },
};

export default header;
