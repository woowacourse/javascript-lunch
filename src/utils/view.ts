import { $$ } from './DOM';

export const hideErrorMessage = () => {
  const $errors = $$('.error');
  $errors.forEach((el) => {
    el.classList.add('hidden');
  });
};

export const closeModal = (modal: HTMLElement | Element) => {
  hideErrorMessage();
  modal.classList.remove('modal--open');
  resetBodyScroll();
};

export const blockModalBodyScroll = () => {
  if (
    [...$$('.modal')].some((modal) => {
      return modal.classList.contains('modal--open');
    })
  ) {
    document.body.style.overflow = 'hidden';
  }
};

export const resetBodyScroll = () => {
  document.body.style.overflow = 'auto';
};

export const makeLabel = ({ htmlFor, text }: { htmlFor: string; text: string }) => {
  const $label = document.createElement('label');
  $label.setAttribute('for', htmlFor);
  $label.setAttribute('for', 'text-caption');
  $label.textContent = text;
  return $label;
};

export const makeInputInfo = (infoText: string) => {
  const $inputInfo = document.createElement('span');
  $inputInfo.classList.add('help-text', 'text-caption');
  $inputInfo.textContent = infoText;
  return $inputInfo;
};
