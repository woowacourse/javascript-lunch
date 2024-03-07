import { $ } from '../utils/selector';

const modal = {
  create(className, content) {
    const modal = document.createElement('div');
    modal.className = className;

    const backdrop = createBackdrop();
    modal.append(backdrop, content);

    return modal;
  },

  createContainer() {
    const container = document.createElement('div');
    container.className = 'modal-container';

    return container;
  },

  remove(className) {
    $(`.${className}`).remove();
  },
};

function createBackdrop() {
  const backdrop = document.createElement('div');
  backdrop.className = 'modal-backdrop';

  return backdrop;
}

export default modal;
