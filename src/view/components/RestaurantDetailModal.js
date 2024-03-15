import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';
import '../../css/restaurantDetailModal.css';
import { IMG_CATEGORY } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';

const dialog = document.getElementById('restaurant-detail-modal');

function applyRestaurantDescription(description) {
  const restaurantDescription = document.getElementById('restaurant-detail-description');
  if (description) {
    restaurantDescription.innerText = description;
  }
  if (!description) {
    restaurantDescription.innerText = '설명이 없습니다.';
  }
}

function applyRestaurantLink(link) {
  const restaurantLink = document.getElementById('restaurant-detail-link');
  if (link) {
    restaurantLink.href = link;
    restaurantLink.innerText = '📍 홈페이지 바로가기!';
  }
  if (!link) {
    restaurantLink.href = '';
    restaurantLink.innerText = '';
  }
}

function applyRestaurantDetailByInfo({ category, name, distanceFromCampus, description, link }) {
  const categoryIcon = document.getElementById('restaurant-detail-icon');
  categoryIcon.src = `./templates/category-${IMG_CATEGORY[category]}.png`;
  categoryIcon.alt = category;
  const restaurantName = document.getElementById('restaurant-detail-name');
  restaurantName.innerText = name;
  const restaurantDistance = document.getElementById('restaurant-detail-distance');
  restaurantDistance.innerText = `캠퍼스부터 ${distanceFromCampus}분 내`;
  applyRestaurantDescription(description);
  applyRestaurantLink(link);
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

function executeDelete(id) {
  restaurantCatalog.removeRestaurant(id); // domain data 삭제
  removeRestaurantInLocalStorage(id); // LocalStorage data 삭제
  document.querySelector('.restaurant-list').render(); // rerender
  closeRestaurantDetailModal();
}

function addDeleteEventToButton(id) {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button');
  deleteEventHandler = () => {
    const CONFIRM_STRING = '정말로 삭제하시겠습니까?';
    const isConfirm = window.confirm(CONFIRM_STRING);
    if (isConfirm) executeDelete(id);
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
