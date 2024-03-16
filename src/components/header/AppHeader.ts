import { IMAGE_MAP } from '../../constants/imageMap';
import { createImageButton } from '../unit/ImageButton';

const TITLE = '점심 뭐 먹지';

export const createAppHeader = (): HTMLElement => {
  /* header */
  const $header = document.createElement('header');
  $header.classList.add('app-header');

  /* 타이틀 */
  const $title = document.createElement('h1');
  $title.classList.add('app-header__title', 'text-title');
  $title.textContent = TITLE;

  /* 버튼 */
  const $imageButton = createImageButton({
    button: { ariaLabel: '음식점 추가', class: 'app-header__button' },
    image: { src: IMAGE_MAP.addButton, alt: '음식점 추가' }
  });

  /* 컴포넌트 조립 */
  $header.appendChild($title);
  $header.appendChild($imageButton);

  return $header;
};
