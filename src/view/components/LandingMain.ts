import { Category, Filter } from '../../domain/model/LunchRecommendation';
import { useState } from '../../utils/core';
import { Nav } from './Nav';
import { Restaurants } from './Restaurants';

function LandingMain() {
  const [category, setCategory] = useState<Category>('전체');
  const [filter, setFilter] = useState<Filter>('거리순');

  function handleCategory(category: Category) {
    setCategory(category);
  }

  function handleFilter(filter: Filter) {
    setFilter(filter);
  }

  return `
    <main>
      ${Nav.bind(Nav)({ category, filter, handleCategory, handleFilter })}
      ${Restaurants()}
    </main>
  `;
}

export { LandingMain };
