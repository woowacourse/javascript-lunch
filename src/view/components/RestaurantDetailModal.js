import '../../css/restaurantDetailModal.css';
import { IMG_CATEGORY } from '../../domain/Restaurant';

const dialog = document.getElementById('restaurant-detail-modal');

function applyRestaurantDetailByInfo({ category, name, distanceFromCampus, description }) {
  const categoryIcon = document.getElementById('restaurant-detail-icon');
  categoryIcon.src = `./templates/category-${IMG_CATEGORY[category]}.png`;
  categoryIcon.alt = category;
  const restaurantName = document.getElementById('restaurant-detail-name');
  restaurantName.innerText = name;
  const restaurantDistance = document.getElementById('restaurant-detail-distance');
  restaurantDistance.innerText = `캠퍼스부터 ${distanceFromCampus}분 내`;
  const restaurantDescription = document.getElementById('restaurant-detail-description');
  restaurantDescription.innerText = description;
}

export function showRestaurantDetailModal(restaurantInfo) {
  applyRestaurantDetailByInfo(restaurantInfo);
  // TODO: 버튼이벤트 추가
  dialog.showModal();
}

export function closeRestaurantDetailModal() {
  dialog.innerHTML = '';
  // TODO: 버튼 이벤트 삭제
  dialog.close();
}
