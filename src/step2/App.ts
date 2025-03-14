import Header from './components/Header';
import NavTab from './components/NavTab';
import { TAB } from './constants/restaurantTypes';
import useModal from './hooks/useModal';
import useTab from './hooks/useTab';
import { Category, Sorting } from './types/restaurants';
import { useState } from './utils/core/Core';
import { getStorage } from './utils/@common/localStorage';
import useRestaurants from './hooks/useRestaurants';
import RestaurantList from './components/RestaurantList';
import FilterSection from './components/FilterSection';

function App() {
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  const [category, setCategory] = useState<Category>('전체');
  const [sorting, setSorting] = useState<Sorting>('name');
  const { getFilteredRestaurants } = useRestaurants(category, sorting);

  const filteredRestaurants = getFilteredRestaurants();

  return `
    <div>
      ${Header({ isModalOpen, openModal })}
      ${NavTab({ tab, setTabAll, setTabFavorite })}
      ${
        tab === TAB.ALL
          ? `
            ${FilterSection({
              category,
              setCategory,
              sorting,
              setSorting,
            })}
            ${RestaurantList({
              restaurants: filteredRestaurants ?? [],
              isModalOpen,
              closeModal,
            })}
          `
          : `
            ${RestaurantList({
              restaurants: getStorage()?.filter((r) => r.isFavorite) ?? [],
              isModalOpen,
              closeModal,
            })}
          `
      }
    </div>
  `;
}

export default App;
