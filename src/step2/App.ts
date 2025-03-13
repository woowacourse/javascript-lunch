import Header from './components/Header';
import NavTab from './components/NavTab';
import Restaurant from './components/Restaurant';
import { CategorySelect } from './components/CategorySelect';
import { SortingSelect } from './components/SortingSelect';
import { TAB } from './constants/restaurantTypes';
import useModal from './hooks/useModal';
import useTab from './hooks/useTab';
import RESTAURANT_INFO from './mocks/restaurantInfo';
import { Category, Sorting } from './types/restaurants';
import { useState } from './utils/core/Core';

function App() {
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  const [category, setCategory] = useState<Category>('전체');
  const [sorting, setSorting] = useState<Sorting>('name');

  const handleCategoryChange = (selectedCategory: Category) => {
    console.log('selectedCategory', selectedCategory);
    setCategory(selectedCategory);
  };

  const handleSortChange = (selectedSort: Sorting) => {
    setSorting(selectedSort);
  };

  const getFilteredRestaurants = () => {
    let filtered =
      category === '전체'
        ? RESTAURANT_INFO
        : RESTAURANT_INFO.filter(
            (restaurant) => restaurant.category === category
          );

    return filtered.sort((a, b) => {
      if (sorting === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  };

  const filteredRestaurants = getFilteredRestaurants();

  return `
    <div>
      ${Header({ openModal })}
      ${NavTab({ tab, setTabAll, setTabFavorite })}
      <section class="restaurant-filter-container">
        ${CategorySelect({
          handleCategoryChange,
          category,
        })}
        ${SortingSelect({
          handleSortChange,
          sorting,
        })}
      </section>
        ${filteredRestaurants
          .map((restaurant) => Restaurant(restaurant))
          .join('')}
    </div>
  `;
}

export default App;
