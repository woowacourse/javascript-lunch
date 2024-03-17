import { ILocalData } from '../../Controller/WebController';
import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';
import '../../css/restaurantDetailModal.css';
import { IMG_CATEGORY, IRestaurantInfo } from '../../domain/Restaurant';
import restaurantCatalog from '../../domain/RestaurantCatalog';
import RestaurantCards from './RestaurantCards';

const dialog = document.getElementById('restaurant-detail-modal') as HTMLDialogElement;

function applyRestaurantDescription(description: string | undefined) {
  const restaurantDescription = document.getElementById('restaurant-detail-description') as HTMLElement;
  if (description) {
    restaurantDescription.innerText = description;
  }
  if (!description) {
    restaurantDescription.innerText = '설명이 없습니다.';
  }
}

function applyRestaurantLink(link: string | undefined) {
  const restaurantLink = document.getElementById('restaurant-detail-link') as HTMLLinkElement;
  if (link) {
    restaurantLink.href = link;
    restaurantLink.innerText = '📍 홈페이지 바로가기!';
  }
  if (!link) {
    restaurantLink.href = '';
    restaurantLink.innerText = '';
  }
}

function applyRestaurantDetailByInfo({ category, name, distanceFromCampus, description, link }: IRestaurantInfo) {
  const categoryIcon = document.getElementById('restaurant-detail-icon') as HTMLImageElement;
  categoryIcon.src = `./templates/category-${IMG_CATEGORY[category]}.png`;
  categoryIcon.alt = category;
  const restaurantName = document.getElementById('restaurant-detail-name') as HTMLElement;
  restaurantName.innerText = name;
  const restaurantDistance = document.getElementById('restaurant-detail-distance') as HTMLElement;
  restaurantDistance.innerText = `캠퍼스부터 ${distanceFromCampus}분 내`;
  applyRestaurantDescription(description);
  applyRestaurantLink(link);
}

let deleteEventHandler: () => void;

function removeDeleteEventToButton() {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button') as HTMLButtonElement;
  deleteButton.removeEventListener('click', deleteEventHandler);
}

function closeRestaurantDetailModal() {
  removeDeleteEventToButton();
  dialog.close();
}

function removeRestaurantInLocalStorage(id: number) {
  const localData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)!) as ILocalData;
  localData[id] = null;
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(localData));
}

function executeDelete(id: number) {
  restaurantCatalog.removeRestaurant(id); // domain data 삭제
  removeRestaurantInLocalStorage(id); // LocalStorage data 삭제
  const restaurantList = document.querySelector('.restaurant-list') as RestaurantCards;
  restaurantList.render(); // rerender
  closeRestaurantDetailModal();
}

function addDeleteEventToButton(id: number) {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button') as HTMLButtonElement;
  deleteEventHandler = () => {
    const CONFIRM_STRING = '정말로 삭제하시겠습니까?';
    const isConfirm = window.confirm(CONFIRM_STRING);
    if (isConfirm) executeDelete(id);
  };
  deleteButton.addEventListener('click', deleteEventHandler);
}

const closeButton = document.getElementById('restaurant-detail-modal-close-button') as HTMLElement;
closeButton.addEventListener('click', closeRestaurantDetailModal);

export function showRestaurantDetailModal(restaurantInfo: IRestaurantInfo) {
  applyRestaurantDetailByInfo(restaurantInfo);
  addDeleteEventToButton(restaurantInfo.id!);
  dialog.showModal();
}
