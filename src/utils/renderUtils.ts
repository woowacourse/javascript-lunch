import createRestaurantItem from '../components/RestaurantItem.js';
import { State } from '../store/stateStore.ts';

export function reRenderRestaurantList(data: State[]) {
  const ul = document.querySelector('.restaurant-list');
  if (!ul) return;
  ul.innerHTML = data.map((restaurant) => createRestaurantItem(restaurant)).join('');
}
