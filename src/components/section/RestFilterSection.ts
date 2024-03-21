import { FILTER_OPTIONS } from '../../constants/filter';
import { Global } from '../../controllers/Global';
import { KeyOfCategoryKey, KeyOfSortingKey } from '../../types/filter';
import { Select } from '../singleElement/Select';

const updateRestCardList = ({
  categoryKey,
  sortingKey
}: {
  categoryKey?: KeyOfCategoryKey;
  sortingKey?: KeyOfSortingKey;
}) => {
  Global.restListController.render({ categoryKey, sortingKey });
};

export const RestFilterSection = (): HTMLElement => {
  /* section */
  const $section = document.createElement('section');
  $section.classList.add('rest-filter-section');

  /* 카테고리 필터 */
  const $categoryFilter = Select({
    optionData: FILTER_OPTIONS.categoryKey
  });

  /* 정렬 필터 */
  const $sortingFilter = Select({ optionData: FILTER_OPTIONS.sortingKey });

  /* 컴포넌트 조립 */
  $section.appendChild($categoryFilter);
  $section.appendChild($sortingFilter);

  $section.onchange = () =>
    updateRestCardList({
      categoryKey: $categoryFilter.value as KeyOfCategoryKey,
      sortingKey: $sortingFilter.value as KeyOfSortingKey
    });

  return $section;
};
