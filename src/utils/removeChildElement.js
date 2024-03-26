import { $ } from './selector.js';

function removeChildElement(target) {
  const $target = $(target);

  if (!$target) throw new Error('지울 DOM을 찾지 못했습니다.');

  $target.replaceChildren();
}

export { removeChildElement };
