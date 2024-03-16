export const createRestListSection = (): HTMLElement => {
  /* section */
  const $section = document.createElement('section');
  $section.classList.add('rest-list-section');

  /* 리스트 */
  const $list = document.createElement('ul');

  /* 컴포넌트 조립 */
  $section.appendChild($list);

  return $section;
};
