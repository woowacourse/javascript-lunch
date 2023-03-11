import { $ } from '../utils/selector';

export const handleFavoriteIcon = (number: string) => {
  return $(`.favorite-icon-filled-${number}`)?.classList.toggle(
    'favorite-icon-filled--open'
  );
};
