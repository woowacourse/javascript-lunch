import { $ } from '../../utils/selector.js';

const STAR_ICONS = {
  fill: './favorite-icon-filled.png',
  noFill: './favorite-icon-lined.png',
};

function createStarButton({ id }) {
  const starButton = renderStarButton({ id });

  return starButton;
}

// 별 버튼의 이미지를 채움, 안채움 두 가지에서 토글하는 기능
function starButtonClickHandler(starButton) {
  starButton.classList.toggle('star__filled');

  if (starButton.classList.contains('star__filled'))
    starButton.style.backgroundImage = `url(${STAR_ICONS.fill})`;
  else starButton.style.backgroundImage = `url(${STAR_ICONS.noFill})`;
}

function renderStarButton({ id }) {
  const starButton = document.createElement('button');

  starButton.style.width = '32px';
  starButton.style.height = '32px';

  starButton.style.backgroundImage = `url(${STAR_ICONS.noFill})`;
  starButton.style.backgroundSize = 'cover';
  starButton.style.backgroundColor = 'transparent';

  starButton.style.border = 'none';

  starButton.classList.add('star__button');
  starButton.id = id;

  return starButton;
}

export const starButton = {
  create: createStarButton,
  clickHandle: starButtonClickHandler,
};
