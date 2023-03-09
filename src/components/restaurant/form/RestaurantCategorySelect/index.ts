import Restaurant, { RestaurantCategory } from '../../../../domain/Restaurant';
import Select from '../../../common/form/Select';
import { define } from '../../../decorators';

@define('r-restaurant-category-select')
class RestaurantCategorySelect extends Select<RestaurantCategory | string | null> {
  constructor() {
    super();

    this.setOptions([
      {
        value: this.getAttribute('default-option-value'),
        label: this.getAttribute('default-option-label') ?? '',
      },
      ...Restaurant.CATEGORIES.map((category) => ({
        value: category,
        label: category,
      })),
    ]);
  }
}

export default RestaurantCategorySelect;
