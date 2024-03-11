export const hideErrorMessage = () => {
  document.querySelectorAll('.error').forEach((el) => {
    el.classList.add('hidden');
  });
};

export const closeModal = (modal: HTMLElement) => {
  hideErrorMessage();
  modal.classList.remove('modal--open');
  blockModalBodyScroll();
};

export const blockModalBodyScroll = () => {
  if (document.querySelector('.modal')?.classList.contains('modal--open'))
    return (document.body.style.overflow = 'hidden');
  document.body.style.overflow = 'auto';
};

export const makeLabel = ({ htmlFor, text }: { htmlFor: string; text: string }) => {
  const $label = document.createElement('label');
  $label.setAttribute('for', htmlFor);
  $label.textContent = text;
  return $label;
};

export const makeInputInfo = (infoText: string) => {
  const $inputInfo = document.createElement('span');
  $inputInfo.classList.add('help-text', 'text-caption');
  $inputInfo.textContent = infoText;
  return $inputInfo;
};
