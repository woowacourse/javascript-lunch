import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Nav } from './Nav';
import { Restaurants } from './Restaurants';

function LandingMain() {
  const {
    values: { restaurants, category, sortOption },
    handlers: { handleCategory, handleSortOption },
  } = useRestaurants();

  return `
    <main>
      ${Nav({ category, sortOption, handleCategory, handleSortOption })}
      ${Restaurants({ restaurants })}
    </main>
  `;
}

export { LandingMain };
