import { createRestFilterSection } from '../section/RestFilterSection';
import { createRestListSection } from '../section/RestListSection';

export const createRestListMain = (): HTMLElement => {
  const $main = document.createElement('main');
  const $filterSection = createRestFilterSection();
  const $listSection = createRestListSection();

  $main.appendChild($filterSection);
  $main.appendChild($listSection);

  return $main;
};
