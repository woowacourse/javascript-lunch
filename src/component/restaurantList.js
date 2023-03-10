import restaurantListItem from './restaurantListItem';

const restaurantList = ({ restaurants }) => {
  return `
    <ul class="restaurant-list">
      ${restaurants.map((restaurant) => restaurantListItem({ restaurant })).join('')}
    </ul>
  `;
};

export default restaurantList;
