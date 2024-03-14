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

let deleteEventHandler;

function addDeleteEventToButton(id) {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button');
  deleteEventHandler = () => {
    // TODO: 삭제하는 기능을 만듭니다.
    // 1. domian data를 삭제합니다.
    // 2. LS data를 삭제합니다.
    console.log(id);
  };
  deleteButton.addEventListener('click', deleteEventHandler);
}

export function showRestaurantDetailModal(restaurantInfo) {
  applyRestaurantDetailByInfo(restaurantInfo);
  addDeleteEventToButton(restaurantInfo.id);
  dialog.showModal();
}

function removeDeleteEventToButton() {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button');
  deleteButton.removeEventListener('click', deleteEventHandler);
}

function closeRestaurantDetailModal() {
  removeDeleteEventToButton();
  dialog.close();
}

const closeButton = document.getElementById('restaurant-detail-modal-close-button');
closeButton.addEventListener('click', closeRestaurantDetailModal);
