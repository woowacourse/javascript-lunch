import { $, $$ } from './DOM';

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
  document.body.style.overflow = 'hidden';
  // const $modals = $$('.modal');
  // const isModalOpen = [...$modals].some((modal) => {
  //   modal.classList.contains('modal--opens');
  // });
  // if (isModalOpen) {
  //   return (document.body.style.overflow = 'hidden');
  // }
  // document.body.style.overflow = 'auto';
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
