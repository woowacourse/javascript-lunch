import { RestFilterSection } from '../section/RestFilterSection';
import { RestListSection } from '../section/RestListSection';

export const RestListMain = (): HTMLElement => {
  const $main = document.createElement('main');
  const $filterSection = RestFilterSection();
  const $listSection = RestListSection();

  $main.appendChild($filterSection);
  $main.appendChild($listSection);

  return $main;
};
