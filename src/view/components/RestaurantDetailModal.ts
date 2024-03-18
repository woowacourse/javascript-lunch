import restaurantCatalog from '../../domain/RestaurantCatalog';
import { Category, DistanceFromCampus, IMG_CATEGORY, IRestaurantInfo } from '../../domain/Restaurant';
import { ILocalData } from '../../Controller/WebController';

import { LOCAL_STORAGE_KEY } from '../../constants/LocalStorageKey';

import RestaurantCards from './RestaurantCards';
import ModalLikeStar from './ModalLikeStar';

import '../../css/restaurantDetailModal.css';
import '../../css/likeStar.css';

const dialog = document.getElementById('restaurant-detail-modal') as HTMLDialogElement;

function applyRestaurantIconNameDistance(category: Category) {
  const categoryIcon = document.getElementById('restaurant-detail-icon') as HTMLImageElement;
  categoryIcon.src = `./templates/category-${IMG_CATEGORY[category]}.png`;
  categoryIcon.alt = category;
}

function applyRestaurantName(name: string) {
  const restaurantName = document.getElementById('restaurant-detail-name') as HTMLElement;
  restaurantName.innerText = name;
}

function applyRestaurantDistance(distanceFromCampus: DistanceFromCampus) {
  const restaurantDistance = document.getElementById('restaurant-detail-distance') as HTMLElement;
  restaurantDistance.innerText = `캠퍼스부터 ${distanceFromCampus}분 내`;
}

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

function applyRestaurantStar(id: number, isLiked: boolean) {
  const restaurantDetailMain = document.getElementById('restaurant-detail-main') as HTMLElement;
  const modalStar = new ModalLikeStar(isLiked, id);
  modalStar.classList.add('modal-like-star');
  restaurantDetailMain.append(modalStar);
}

function applyRestaurantDetailByInfo(restaurantInfo: IRestaurantInfo) {
  applyRestaurantIconNameDistance(restaurantInfo.category);
  applyRestaurantName(restaurantInfo.name);
  applyRestaurantDistance(restaurantInfo.distanceFromCampus);
  applyRestaurantDescription(restaurantInfo.description);
  applyRestaurantLink(restaurantInfo.link);
  applyRestaurantStar(restaurantInfo.id!, restaurantInfo.isLiked!);
}

function deleteEventHandlerCloser() {
  let deleteEventHandler: () => void;

  function setDeleteEventHandler(handler: () => void) {
    deleteEventHandler = handler;
  }

  function getDeleteEventHandler() {
    return deleteEventHandler;
  }

  return { setDeleteEventHandler, getDeleteEventHandler };
}

const deleteEventHandlerInstance = deleteEventHandlerCloser();

function removeDeleteEventToButton() {
  const deleteButton = document.getElementById('restaurant-detail-modal-delete-button') as HTMLButtonElement;
  deleteButton.removeEventListener('click', deleteEventHandlerInstance.getDeleteEventHandler());
}

function closeRestaurantDetailModal() {
  removeDeleteEventToButton();
  const modalLikeStar = document.querySelector('.modal-like-star') as ModalLikeStar;
  modalLikeStar.remove();
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
  deleteEventHandlerInstance.setDeleteEventHandler(() => {
    const CONFIRM_STRING = '정말로 삭제하시겠습니까?';
    const isConfirm = window.confirm(CONFIRM_STRING);
    if (isConfirm) executeDelete(id);
  });
  deleteButton.addEventListener('click', deleteEventHandlerInstance.getDeleteEventHandler());
}

const closeButton = document.getElementById('restaurant-detail-modal-close-button') as HTMLElement;
closeButton.addEventListener('click', closeRestaurantDetailModal);

export function showRestaurantDetailModal(restaurantInfo: IRestaurantInfo) {
  applyRestaurantDetailByInfo(restaurantInfo);
  addDeleteEventToButton(restaurantInfo.id!);
  dialog.showModal();
}
