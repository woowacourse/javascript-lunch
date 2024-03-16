import { FILTER_OPTIONS } from '../../constants/filter';
import { createSelect } from '../unit/Select';

export const createRestFilterSection = (): HTMLElement => {
  /* section */
  const $section = document.createElement('section');
  $section.classList.add('rest-filter-section');

  /* 카테고리 필터 */
  const $categoryFilter = createSelect({
    optionData: FILTER_OPTIONS.category
  });

  /* 정렬 필터 */
  const $sortingFilter = createSelect({ optionData: FILTER_OPTIONS.sortingKey });

  /* 컴포넌트 조립 */
  $section.appendChild($categoryFilter);
  $section.appendChild($sortingFilter);

  return $section;
};
