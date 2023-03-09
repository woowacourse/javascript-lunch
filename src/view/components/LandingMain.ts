import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';
import { Restaurants } from './Restaurants';

function LandingMain() {
  const {
    values: { restaurants, category, sortOption, tab },
    handlers: { handleCategory, handleSortOption, handleFavoriteBtn, tabAll, tabFavorite },
  } = useRestaurants();

  return `
    <main>
      ${Nav({
        NavTab: NavTab({ tab, tabAll, tabFavorite }),
        NavFilter: NavFilter({ category, sortOption, handleCategory, handleSortOption }),
      })}
      ${Restaurants({ restaurants, handleFavoriteBtn })}
    </main>
  `;
}

export { LandingMain };
