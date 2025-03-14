import Header from './components/Header';
import NavTab from './components/NavTab';
import { Tab, TAB } from './constants/restaurantTypes';
import { Category, Sorting } from './types/restaurants';
import { useState } from './utils/core/Core';
import { getStorage } from './utils/@common/localStorage';
import useRestaurants from './hooks/useRestaurants';
import RestaurantList from './components/RestaurantList';
import FilterSection from './components/FilterSection';

function App() {
  const [currentTab, setCurrentTab] = useState<Tab>(TAB.ALL);
  const [filterOptions, setFilterOptions] = useState({
    category: '전체' as Category,
    sorting: 'name' as Sorting,
  });

  const { getFilteredRestaurants } = useRestaurants(
    filterOptions.category,
    filterOptions.sorting
  );

  const filteredRestaurants = getFilteredRestaurants();

  return `
    <div>
      ${Header()}
      ${NavTab({ onTabChange: setCurrentTab })}
      ${
        currentTab === TAB.ALL
          ? `
            ${FilterSection({
              onFilterChange: setFilterOptions,
            })}
            ${RestaurantList({
              restaurants: filteredRestaurants ?? [],
            })}
          `
          : `
            ${RestaurantList({
              restaurants: getStorage()?.filter((r) => r.isFavorite) ?? [],
            })}
          `
      }
    </div>
  `;
}

export default App;
