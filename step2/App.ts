import FilterSection from './src/components/FilterSection';
import Header from './src/components/Header';
import NavTab from './src/components/NavTab';
import RestaurantList from './src/components/RestaurantList';
import { TAB, Tab } from './src/constants/restaurantTypes';
import useRestaurants from './src/hooks/useRestaurants';
import { Category, Sorting } from './src/types/restaurants';
import { useState } from './src/utils/core/Core';

type FilterOptions = {
  [K in 'category' | 'sorting']: K extends 'category' ? Category : Sorting;
};

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(TAB.ALL);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: '전체',
    sorting: 'name',
  });

  const { getFilteredRestaurants } = useRestaurants(
    filterOptions.category,
    filterOptions.sorting
  );

  return `
     <div>
      ${Header()}
      ${NavTab({ setCurrentTab })}
      ${currentTab === TAB.ALL ? FilterSection({ setFilterOptions }) : ''}
      ${RestaurantList({
        restaurants: getFilteredRestaurants() ?? [],
        currentTab, // 탭 상태를 RestaurantList에 전달
      })}
    </div>
  `;
}

export default App;
