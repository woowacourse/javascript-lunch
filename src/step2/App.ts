import Header from './components/Header';
import NavTab from './components/NavTab';
import Restaurant from './components/Restaurant';
import { CategorySelect } from './components/CategorySelect';
import { SortingSelect } from './components/SortingSelect';
import { TAB } from './constants/restaurantTypes';
import useModal from './hooks/useModal';
import useTab from './hooks/useTab';
import { Category, Sorting } from './types/restaurants';
import { useState } from './utils/core/Core';
import { getStorage } from './utils/@common/localStorage';

function App() {
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  const [category, setCategory] = useState<Category>('전체');
  const [sorting, setSorting] = useState<Sorting>('name');
  const [, setFavorite] = useState(false);

  const handleCategoryChange = (selectedCategory: Category) => {
    setCategory(selectedCategory);
  };

  const handleSortChange = (selectedSort: Sorting) => {
    setSorting(selectedSort);
  };

  const getFilteredRestaurants = () => {
    let filtered =
      category === '전체'
        ? getStorage()
        : getStorage()?.filter(
            (restaurant) => restaurant.category === category
          );

    return filtered?.sort((a, b) => {
      if (sorting === 'name') {
        return a.name.localeCompare(b.name);
      }
      return a.distance - b.distance;
    });
  };

  const filteredRestaurants = getFilteredRestaurants();

  const favoriteRestaurants = getStorage()
    ?.filter((restaurant) => restaurant.isFavorite === true)
    .map((restaurant) =>
      Restaurant({
        ...restaurant,
        favorite: restaurant.isFavorite ?? false,
        setFavorite: (favorite: boolean) => {
          setFavorite(favorite);
        },
        isModalOpen,
        closeModal,
      })
    )
    .join('');

  return `
    <div>
      ${Header({ openModal })}
      ${NavTab({ tab, setTabAll, setTabFavorite })}
      ${
        tab === TAB.ALL
          ? `
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
          ?.map((restaurant) =>
            Restaurant({
              ...restaurant,
              favorite: restaurant.isFavorite ?? false,
              isModalOpen,
              setFavorite: (favorite: boolean) => {
                setFavorite(favorite);
              },
              closeModal,
            })
          )
          .join('')}
      `
          : `
            ${favoriteRestaurants}
          `
      }
    </div>
    
  `;
}

export default App;
