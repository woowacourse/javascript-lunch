import { useState } from '../utils/core/Core';
import { Tab, TAB } from '../constants/restaurantTypes';

function useTab(initialTab: Tab): [Tab, () => void, () => void] {
  const [tab, setTab] = useState<Tab>(initialTab);

  const setTabAll = () => {
    setTab(TAB.ALL);
    console.log('setTabAll');
  };

  const setTabFavorite = () => {
    setTab(TAB.FAVORITE);
    console.log('setTabFavorite');
  };

  return [tab, setTabAll, setTabFavorite];
}

export default useTab;
