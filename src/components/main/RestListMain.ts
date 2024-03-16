export const createRestViewer = (): HTMLElement => {
  const $main = document.createElement('main');
  const $filterSection = document.createElement('section');
  const $listSection = document.createElement('section');

  $main.appendChild($filterSection);
  $main.appendChild($listSection);

  return $main;
};
