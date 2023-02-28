import { ListItem } from './ListItem';

export const List = (restaurants) => {
  return /* html */ `
  <ul class="restaurant-list">
    ${restaurants.map((restaurant) => ListItem(restaurant)).join('')}
  </ul>`;
};
