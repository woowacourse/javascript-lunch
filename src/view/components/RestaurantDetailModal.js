import '../../css/restaurantDetailModal.css';

const dialog = document.getElementById('restaurant-detail-modal');

function generateRestaurantDetailByInfo(restaurantInfo) {
  const infoDiv = document.createElement('div');
  infoDiv.id = 'restaurant-detail-main';
  console.log(restaurantInfo);
  return infoDiv;
}

export function showRestaurantDetailModal(restaurantInfo) {
  const infoDiv = generateRestaurantDetailByInfo(restaurantInfo);
  infoDiv.innerHTML = 'hi';
  dialog.append(infoDiv);
  dialog.showModal();
}

export function closeRestaurantDetailModal() {
  dialog.innerHTML = '';
  dialog.close();
}
