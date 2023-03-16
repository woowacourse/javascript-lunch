import Select from '@/components/common/form/Select';
import { define } from '@/components/decorators';
import type { RestaurantFilter } from '@/domain/RestaurantFilter';
import { sortByDistance, sortByName } from '@/domain/RestaurantFilter';

@define('r-restaurant-sort-select')
class RestaurantSortSelect extends Select<RestaurantFilter> {
  constructor() {
    super();

    this.setOptions([
      { value: sortByName, label: '이름순' },
      { value: sortByDistance, label: '거리순' },
    ]);
  }
}

export default RestaurantSortSelect;
