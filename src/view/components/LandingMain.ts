import { useBoolean } from '../../utils/hooks/useBoolean';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { NavFilter } from './NavFilter';
import { NavTab } from './NavTab';
import { Restaurants } from './Restaurants';

function LandingMain() {
  const {
    values: { restaurants, category, sortOption },
    handlers: { handleCategory, handleSortOption },
  } = useRestaurants();
  const [tab, tabRight, tabLeft] = useBoolean(false);

  return `
    <main>
      ${Nav({
        NavTab: NavTab({ tab, tabRight, tabLeft }),
        NavFilter: NavFilter({ category, sortOption, handleCategory, handleSortOption }),
      })}
      ${Restaurants({ restaurants })}
    </main>
  `;
}

export { LandingMain };
