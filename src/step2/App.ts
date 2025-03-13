import Header from './components/Header';
import NavTab from './components/NavTab';
import Restaurant from './components/Restaurant';
import { CategorySelect } from './components/CategorySelect';
import { SortingSelect } from './components/SortingSelect';
import { TAB } from './constants/restaurantTypes';
import useModal from './hooks/useModal';
import useTab from './hooks/useTab';
import RESTAURANT_INFO from './mocks/restaurantInfo';
import { Category } from './types/restaurants';
import { useState } from './utils/core/Core';

function App() {
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  const [category, setCategory] = useState<Category>('전체');

  const handleCategoryChange = (selectedCategory: Category) => {
    console.log('selectedCategory', selectedCategory);
    setCategory(selectedCategory);
  };

  // 필터링된 레스토랑 목록 가져오기
  const getFilteredRestaurants = () => {
    console.log('category', category);
    if (category === '전체') {
      return RESTAURANT_INFO;
    }
    return RESTAURANT_INFO.filter(
      (restaurant) => restaurant.category === category
    );
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
        ${SortingSelect()}
      </section>
      ${filteredRestaurants
        .map((restaurant) => Restaurant(restaurant))
        .join('')}
    </div>
  `;
}

export default App;
