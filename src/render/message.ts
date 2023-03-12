import errorHandler from '../utils/errorHandler';

export default {
  render: (type: 'success' | 'error', position: 'top' | 'bottom', message: string) => {
    const $message = `<r-message type=${type} position=${position}>${message}</r-message>`;

    const $body = document.querySelector<HTMLBodyElement>('body');

    if (!$body) return errorHandler.doesNotExistElement();

    $body.insertAdjacentHTML('beforebegin', $message);
  },
};
