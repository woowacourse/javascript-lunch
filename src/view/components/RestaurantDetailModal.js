import '../../css/restaurantDetailModal.css';
import { IMG_CATEGORY } from '../../domain/Restaurant';

const dialog = document.getElementById('restaurant-detail-modal');

function generateRestaurantDetailByInfo({ category, name, distanceFromCampus, description }) {
  const infoDiv = document.createElement('div');
  infoDiv.id = 'restaurant-detail-main';
  infoDiv.innerHTML = `
  <div class="restaurant__category">
  <img src="./templates/category-${IMG_CATEGORY[category]}.png" alt="${category}" class="category-icon">
  </div>
  <h3 class="restaurant__name text-subtitle">${name}</h3>
    <span class="restaurant__distance text-body">캠퍼스부터 ${distanceFromCampus}분 내</span>
    <p class=".restaurant-detail-modal-description text-body">${description}</p>`;
  return infoDiv;
}

export function showRestaurantDetailModal(restaurantInfo) {
  const infoDiv = generateRestaurantDetailByInfo(restaurantInfo);
  dialog.append(infoDiv);
  dialog.showModal();
}

export function closeRestaurantDetailModal() {
  dialog.innerHTML = '';
  dialog.close();
}
