import { IMAGE_MAP } from '../../constants/imageMap';
import { Global } from '../../controllers/Global';
import { createImageButton } from '../unit/ImageButton';

const TITLE = '점심 뭐 먹지';

const openAddRestDialog = () => {
  Global.addRestDialogController?.openDialog();
};

export const AppHeader = (): HTMLElement => {
  /* header */
  const $header = document.createElement('header');
  $header.classList.add('app-header');

  /* 타이틀 */
  const $title = document.createElement('h1');
  $title.classList.add('app-header__title', 'text-title');
  $title.textContent = TITLE;

  /* 버튼 */
  const $imageButton = createImageButton({
    button: { 'aria-label': '음식점 추가', class: 'app-header__button', type: 'button', onclick: openAddRestDialog },
    image: { src: IMAGE_MAP.addButton, alt: '음식점 추가' }
  });

  /* 컴포넌트 조립 */
  $header.appendChild($title);
  $header.appendChild($imageButton);

  return $header;
};
