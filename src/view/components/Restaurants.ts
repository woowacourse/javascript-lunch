import { Restaurant } from './Restaurant';

function Restaurants() {
  return `
    <section class="restaurant-list-container">
      <ul class="restaurant-list">
        ${Array(5).fill('').map(Restaurant).join('')}
      </ul>
    </section>
  `;
}

export { Restaurants };
