import { createRestFilterSection } from '../section/RestFilterSection';

export const createRestViewer = (): HTMLElement => {
  const $main = document.createElement('main');
  const $filterSection = createRestFilterSection();
  const $listSection = document.createElement('section');

  $main.appendChild($filterSection);
  $main.appendChild($listSection);

  return $main;
};
