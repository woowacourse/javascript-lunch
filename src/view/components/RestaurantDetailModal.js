import { LOCAL_STORAGE_KEY } from '../../Controller/WebController';
import '../../css/restaurantDetailModal.css';
import { IMG_CATEGORY } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';

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

function removeDeleteEventToButton() {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button');
  deleteButton.removeEventListener('click', deleteEventHandler);
}

function closeRestaurantDetailModal() {
  removeDeleteEventToButton();
  dialog.close();
}

function removeRestaurantInLocalStorage(index) {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  localData[index] = null;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
}

function addDeleteEventToButton(id) {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button');
  deleteEventHandler = () => {
    restaurantCatalog.removeRestaurant(id); // domain data 삭제
    removeRestaurantInLocalStorage(id); // LocalStorage data 삭제
    document.querySelector('.restaurant-list').render(); // rerender
    closeRestaurantDetailModal();
  };
  deleteButton.addEventListener('click', deleteEventHandler);
}

export function showRestaurantDetailModal(restaurantInfo) {
  applyRestaurantDetailByInfo(restaurantInfo);
  addDeleteEventToButton(restaurantInfo.id);
  dialog.showModal();
}

const closeButton = document.getElementById('restaurant-detail-modal-close-button');
closeButton.addEventListener('click', closeRestaurantDetailModal);
