import { TAB, Tab } from '../../constants/lunchRecommendation';
import { useState } from '../core';

function useTab(initialTab: Tab = TAB.ALL): [Tab, VoidFunction, VoidFunction] {
  const [tab, setTab] = useState<Tab>(initialTab);

  const setTabAll = () => setTab(TAB.ALL);
  const setTabFavorite = () => setTab(TAB.FAVORITE);

  return [tab, setTabAll, setTabFavorite];
}

export { useTab };
