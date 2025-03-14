import { Tab, TAB } from '../constants/restaurantTypes';
import useTab from './useTab';

interface UseTabChangeReturn {
  tab: Tab;
  handleTabChange: (newTab: Tab) => void;
}

const useTabChange = (): UseTabChangeReturn => {
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);

  const handleTabChange = (newTab: Tab) => {
    newTab === TAB.ALL ? setTabAll() : setTabFavorite();
  };

  return { tab, handleTabChange };
};

export default useTabChange;
