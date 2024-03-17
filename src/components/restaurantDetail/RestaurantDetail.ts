import './RestaurantDetail.css';
import { Restaurant as RestaurantType, CategoryType } from "../../types";
import CategoryImage from "../categoryImage/CategoryImage";
import FavoriteIcon, { IconStateChangeEvent } from '../favoriteIcon/FavoriteIcon';
import { Button, ButtonProps } from '../tag/button';
import Modal from '../modal/Modal';
import App from '../../app';
import storage from '../../storage';
import LOCAL_STORAGE_KEY from '../../constants/LocalStorageKey';
import DOM from '../../utils/DOM';
import Restaurant from '../restaurant/Restaurant';

const { $ } = DOM;
const { FAVORITE_DATA } = LOCAL_STORAGE_KEY;

export interface RestaurantDeleteEvent extends CustomEvent {
  detail: {
    targetId: string;
  }
}

class RestaurantDetail extends HTMLDivElement {
  private favoriteIcon: FavoriteIcon;
  private cancelButton: Button;
  private deleteButton: Button;

  constructor(restaurant: RestaurantType, favoriteIcon: FavoriteIcon) {
    super();    
    this.id = restaurant.id;
    this.className = 'detail__container';
    this.createLayout(restaurant);
    const { cancelButton, deleteButton } = this.createButtons();
    this.cancelButton = cancelButton;
    this.deleteButton = deleteButton;    
    this.favoriteIcon = favoriteIcon;
    this.appendChild(this.favoriteIcon);
    this.listenRerender();    
  }

  createLayout({category, name, distance, introduction, link}: RestaurantType) {    
    this.createCategoryImage(category);
    this.createRestaurantName(name);
    this.createDistance(distance);
    this.createIntroduction(introduction);
    this.createLink(link);
  }

  createCategoryImage(category: CategoryType) {
    const categoryImage = new CategoryImage(category);
    this.appendChild(categoryImage);
  }

  createRestaurantName(name: string) {
    const title = document.createElement('h2');
    title.classList.add('text-subtitle', 'detail__field', 'detail__title');
    title.textContent = name;
    this.appendChild(title);
  }

  createDistance(distance: number) {
    const span = document.createElement('span');
    span.classList.add('restaurant__distance', 'text-body', 'detail__field');
    span.textContent = `캠퍼스부터 ${distance}분 내`;
    this.appendChild(span);
  }

  createIntroduction(introduction?: string) {
    if (introduction === undefined) return;

    const p = document.createElement('p');
    p.classList.add('restaurant__description', 'text-body', 'detail__field');
    p.textContent = introduction;
    this.appendChild(p);
  }

  createLink(link?: string) {
    if (link === undefined || link === '') {
      this.createLinkFallback();
      return;
    };    

    const a = document.createElement('a');
    a.classList.add('restaurant__link', 'text-body', 'detail__field');
    a.href = link;
    a.textContent = link;
    a.target = 'blank'
    this.appendChild(a);
  }

  createLinkFallback() {
    const p = document.createElement('p');
    p.classList.add('restaurant__description', 'text-body', 'detail__field');
    p.textContent = '등록된 url이 없습니다ㅜㅜ';
    this.appendChild(p);
  }

  createButtons() {
    const buttonContainer = document.createElement('div');
    buttonContainer.setAttribute('class', 'button-container');

    const deleteButton: ButtonProps = {
      type: 'button',
      classnames: ['button', 'text-caption', 'delete-restaurant-button'],
      varient: 'secondary',
      children: '삭제하기',
    };
    const cancelButton: ButtonProps = {
      type: 'button',
      classnames: ['button', 'text-caption', 'detail-modal--close'],
      varient: 'primary',
      children: '닫기',
    };

    const buttons = {
      cancelButton: new Button(cancelButton),
      deleteButton: new Button(deleteButton),
    }

    buttonContainer.appendChild(buttons.deleteButton);
    buttonContainer.appendChild(buttons.cancelButton);
    this.appendChild(buttonContainer);
    return buttons;
  }

  listenCloseButtonClick() {        
    this.cancelButton.addEventListener('click', () => {      
      (this.parentElement?.parentElement as Modal).toggleModal('detail-modal');
    });
  }

  listenDeleteButonClick(toggleModal: Function) { 
    this.deleteButton.addEventListener('click', () => {
      if (window.confirm('정말 삭제하시겠습니까?')) {
        toggleModal();
        this.dispatchRestaurantDeleteEvent();
      }
    })
  }

  private dispatchRestaurantDeleteEvent() {
    const restaurantDeleteEvent = new CustomEvent('deleteRestaurant', {
      detail: {
        targetId: this.id,
      }
    });        
    document.dispatchEvent(restaurantDeleteEvent);
  }

  getChangeState(id: string) {
    return {
      addFavorite: () => {
        App.matzip.addFavorite(id);
        storage.addData<string>(FAVORITE_DATA, id);     
      },
      deleteFavorite: () => {
        App.matzip.deleteFavorite(id);        
        storage.modifyData<string>(FAVORITE_DATA, App.matzip.getMyFavorites());
      },
      targetId: id,
    };
  }

  listenRerender() {
    document.addEventListener('iconStateChange', (event: Event) => {
      const iconStateChangeEvent = event as IconStateChangeEvent;
      const {targetId, state} = iconStateChangeEvent.detail;
      
      const newElement = new FavoriteIcon({active: state, isChild: false, changeState: this.getChangeState(targetId) });
      const target = $<Restaurant>(`#restaurant-list${targetId}`);
      const oldElement = target.querySelector('.favorite-icon-origin') as Node; 
      $<Restaurant>(`#restaurant-list${targetId}`).replaceChild(newElement, oldElement);
    });
  }
}

customElements.define('matzip-restaurant-detail-modal', RestaurantDetail, {extends: 'div'});

export default RestaurantDetail;
