import { ListItem } from './ListItem';

export const List = (restaurants) => {
  return `
  <ul class="restaurant-list">
    ${restaurants.map((restaurant) => ListItem(restaurant)).join('')}
  </ul>`;
};
