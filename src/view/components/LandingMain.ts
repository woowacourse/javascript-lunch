import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { Tab } from './Tab';
import { Nav } from './Nav';
import { RestaurantList } from './RestaurantList';
import { useEvents } from '../../utils/core';

function LandingMain() {
  const {
    values: { restaurants, category, sortOption, oftenOption },
    handlers: { handleCategory, handleSortOption, handleOftenTab, handleClickOftenBtn },
  } = useRestaurants();

  return `
    <main class="wrapper">
      ${Tab({ oftenOption, handleOftenTab })}
      <div class="contentWrapper">
        <div class="content ${!oftenOption ? 'active' : ''}" id="all">
          ${Nav({ category, sortOption, handleCategory, handleSortOption })}
          ${RestaurantList({ restaurants })}
        </div>
        <div class="content ${oftenOption ? 'active' : ''}" id="often">
          ${RestaurantList({ restaurants })}
        </div>
      </div>
    </main>
  `;
}

export { LandingMain };
