import { $ } from '../utils/selector';

export const resetForm = (formSelector: string) => {
  const $form = $(formSelector);

  if ($form instanceof HTMLFormElement) {
    $form.reset();
  }
};

export const scrollToTopForm = (target: string) => {
  const $target = $(target);

  if ($target instanceof HTMLFormElement) {
    $target.scrollTo(0, 0);
  }
};
