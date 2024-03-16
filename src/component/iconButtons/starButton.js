import { $, $$ } from '../../utils/selector.js';

const starButtonClickEvent = new Event('starButtonClick', { bubbles: true });

const STAR_ICONS = {
  fill: './favorite-icon-filled.png',
  noFill: './favorite-icon-lined.png',
};

function createStarButton(buttonProps) {
  const starButton = renderStarButton(buttonProps);

  starButton.addEventListener('click', () =>
    starButton.dispatchEvent(starButtonClickEvent)
  );

  return starButton;
}

// 별 버튼의 이                                                           지를 채움, 안채움 두 가지에서 토글하는 기능
function toggleStarButton(starButtonId) {
  const starButtonList = $$(`.star__button__${starButtonId}`);

  starButtonList.forEach((starButton) => {
    starButton.classList.toggle('star__filled');

    starButton.style.backgroundImage = `url(${
      starButton.classList.contains('star__filled')
        ? STAR_ICONS.fill
        : STAR_ICONS.noFill
    })`;
  });
}

function renderStarButton({ id, initialState }) {
  const starButton = document.createElement('button');

  starButton.style.width = '32px';
  starButton.style.height = '32px';

  starButton.style.backgroundImage = initialState
    ? `url(${STAR_ICONS.fill})`
    : `url(${STAR_ICONS.noFill})`;
  starButton.style.backgroundSize = 'cover';
  starButton.style.backgroundColor = 'transparent';

  starButton.style.border = 'none';

  starButton.classList.add(`star__button__${id}`);
  if (initialState) starButton.classList.add('star__filled');

  return starButton;
}

function isOnStarButton(starButtonId) {
  const starButton = $(`.star__button__${starButtonId}`);

  return starButton.classList.contains('star__filled');
}

export { createStarButton, toggleStarButton, isOnStarButton };
