import './RestaurantDetail.css';
import { Restaurant, CategoryType } from "../../types";
import CategoryImage from "../categoryImage/CategoryImage";
import FavoriteIcon from '../favoriteIcon/FavoriteIcon';
import { Button, ButtonProps } from '../tag/button';
import Modal from '../modal/Modal';

export interface RestaurantDeleteEvent extends CustomEvent {
  detail: {
    targetId: string;
  }
}

class RestaurantDetail extends HTMLDivElement {
  private cancelButton: Button;
  private deleteButton: Button;

  constructor(restaurant: Restaurant) {
    super();
        
    this.id = restaurant.id;
    this.className = 'detail__container';
    this.createLayout(restaurant);
    const { cancelButton, deleteButton } = this.createButtons();
    this.cancelButton = cancelButton;
    this.deleteButton = deleteButton;
  }

  createLayout({category, name, distance, introduction, link}: Restaurant) {    
    this.createCategoryImage(category);
    this.createRestaurantName(name);
    this.createDistance(distance);
    this.createIntroduction(introduction);
    this.createLink(link);
    this.createFavoriteIcon();
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

  createFavoriteIcon() {
    const button = new FavoriteIcon({active: false});
    this.appendChild(button);
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

  // 나중에 as 리팩토링
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
}

customElements.define('matzip-restaurant-detail-modal', RestaurantDetail, {extends: 'div'});

export default RestaurantDetail;
