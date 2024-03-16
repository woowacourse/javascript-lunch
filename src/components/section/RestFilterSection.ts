import { FILTER_OPTIONS } from '../../constants/filter';
import { createSelect } from '../unit/Select';

export const createRestFilterSection = (): HTMLElement => {
  const $section = document.createElement('section');
  $section.classList.add('rest-filter-section');

  const $categoryFilter = createSelect({
    optionData: FILTER_OPTIONS.category
  });

  const $sortingFilter = createSelect({ optionData: FILTER_OPTIONS.sortingKey });

  $section.appendChild($categoryFilter);
  $section.appendChild($sortingFilter);

  return $section;
};
