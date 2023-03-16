import Select from '@/components/common/form/Select';
import { define } from '@/components/decorators';
import type { RestaurantDistance } from '@/domain/Restaurant';
import Restaurant from '@/domain/Restaurant';

@define('r-restaurant-distance-select')
class RestaurantDistanceSelect extends Select<RestaurantDistance | string | null> {
  constructor() {
    super();

    this.setOptions([
      {
        value: this.getAttribute('default-option-value'),
        label: this.getAttribute('default-option-label') ?? '',
      },
      ...Restaurant.DISTANCES.map((distance) => ({
        value: distance,
        label: `${distance}분 내`,
      })),
    ]);
  }
}

export default RestaurantDistanceSelect;
