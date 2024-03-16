import { DISTANCE_FROM_CAMPUS } from '@/constants/Condition';
import { $, $$ } from './DOM';

export const hideErrorMessage = () => {
  const $errors = $$('.error');
  $errors.forEach((el) => {
    el.classList.add('hidden');
  });
};

export const closeModal = () => {
  hideErrorMessage();
  const $modal = $$('.modal');
  [...$modal].forEach((modal) => {
    modal.classList.remove('modal--open');
  });
  resetBodyScroll();
};

export const openModal = (modalType: 'add' | 'detail') => {
  if (modalType === 'add') {
    $('#add-modal').classList.add('modal--open');
  }
  if (modalType === 'detail') {
    $('#detail-modal').classList.add('modal--open');
  }
  blockModalBodyScroll();
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

export const makeTitle = (name: string) => {
  const $title = document.createElement('div');
  $title.classList.add('restaurant__name', 'text-subtitle');
  $title.textContent = name;
  return $title;
};

export const makeDistance = (distance: number) => {
  const $distance = document.createElement('span');
  $distance.classList.add('restaurant__distance', 'text-body');
  $distance.textContent = DISTANCE_FROM_CAMPUS(distance);
  return $distance;
};

export const makeDescription = (showType: 'omit' | 'full', description?: string) => {
  const $description = document.createElement('p');
  if (showType === 'omit') {
    $description.classList.add('restaurant__description');
  }
  $description.classList.add('text-body');
  $description.textContent = `${description || ''}`;
  return $description;
};

export const removeAllChildren = (element: HTMLElement) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild!);
  }
};
