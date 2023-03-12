import { $ } from '../utils/selector';

export const handleFavoriteIcon = (number: string) => {
  return {
    list: $(`.favorite-icon-filled-${number}`)?.classList.toggle(
      'favorite-icon-filled--open'
    ),
    modal: $(`.favorite-icon-filled-modal-${number}`)?.classList.toggle(
      'favorite-icon-filled--open'
    ),
  };
};
