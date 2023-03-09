import Restaurant, { RestaurantDistance } from '../../../../domain/Restaurant';
import Select from '../../../common/form/Select';

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

customElements.define('r-restaurant-distance-select', RestaurantDistanceSelect);

export default RestaurantDistanceSelect;
