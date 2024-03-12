import { distanceChange } from './eventHandlers';
import { renderBaseDistanceComponent, renderDistanceSelectComponent } from './renderHandlers';

function SelectDistance(form: Element) {
  renderBaseDistanceComponent(form);
  renderDistanceSelectComponent();

  distanceChange();
}

export default SelectDistance;
