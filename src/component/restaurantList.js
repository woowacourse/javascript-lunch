import createRestaurantCard from './restaurantCard.js';

function renderRestaurantList(restaurants) {
  const restaurantListContainer = document.querySelector(
    '.restaurant-list-container'
  );

  restaurantListContainer.replaceChildren();

  const restaurantList = document.createElement('ul');
  restaurantList.className = 'restaurant-list';

  restaurants.map((restaurant) => {
    const listItem = document.createElement('li');
    listItem.className = 'restaurant';

    const categoryDiv = createRestaurantCard(restaurant);
    listItem.append(categoryDiv);
    restaurantList.append(listItem);
  });

  restaurantListContainer.appendChild(restaurantList);
}

export default renderRestaurantList;
