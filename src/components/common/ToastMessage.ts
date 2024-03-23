import { $ } from '../../util/dom';

type Props = {
  message: string;
};

const ToastMessage = () => {
  let toastTimeout: NodeJS.Timeout;

  const create = () => {
    const toast = document.createElement('div');
    toast.classList.add('toast');

    const toastContainer = document.createElement('div');
    toastContainer.classList.add('toast-container', 'text-subtitle');

    toast.appendChild(toastContainer);
    return toast;
  };

  const showToastMessage = () => {
    const toastMessage = $('.toast');
    toastMessage?.classList.add('toast--open');
  };

  const closeToastMessage = () => {
    toastTimeout = setTimeout(() => {
      const toastMessage = $('.toast');
      toastMessage?.classList.remove('toast--open');
    }, 1000);
  };

  const render = (message: string) => {
    const toastMessage = $('.toast-container');
    if (toastMessage) {
      toastMessage.textContent = message;
    }

    if (toastMessage?.classList.contains('toast--open')) {
      closeToastMessage();
      return;
    }

    showToastMessage();
    closeToastMessage();

    return;
  };

  return {
    create,
    render
  };
};

export default ToastMessage;
