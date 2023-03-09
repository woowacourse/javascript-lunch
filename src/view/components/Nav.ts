import { CATEGORY, Category, SortOption, SORT_OPTIONS } from '../../constants/lunchRecommendation';
import { useEvents } from '../../utils/core';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';

interface NavProps {
  NavTab: ReturnType<typeof NavTab>;
  NavFilter: ReturnType<typeof NavFilter>;
}

function Nav({ NavTab, NavFilter }: NavProps) {
  return `
      ${NavTab}
      ${NavFilter}
    `;
}

export { Nav };
