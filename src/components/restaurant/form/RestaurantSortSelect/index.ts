import { RestaurantFilter, sortByDistance, sortByName } from '../../../../domain/RestaurantFilter';
import Select from '../../../common/form/Select';
import { define } from '../../../decorators';

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
