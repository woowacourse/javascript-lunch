import './RestaurantDetail.css';
import { Restaurant, CategoryType } from "../../types";
import CategoryImage from "../categoryImage/CategoryImage";
import FavoriteIcon from '../favoriteIcon/FavoriteIcon';
import { Button, ButtonProps } from '../tag/button';

class RestaurantDetail extends HTMLDivElement {
  constructor(restaurant: Restaurant) {
    super();
    this.id = restaurant.id;
    this.className = 'detail__container';
    this.createLayout(restaurant);
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
    if (link === undefined) return;

    const a = document.createElement('a');
    a.classList.add('restaurant__link', 'text-body', 'detail__field');
    a.href = link;
    this.appendChild(a);
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
      classnames: ['button', 'text-caption'],
      varient: 'secondary',
      children: '삭제하기',
    };
    const cancelButton: ButtonProps = {
      type: 'button',
      classnames: ['button', 'text-caption', 'modal--close'],
      varient: 'primary',
      children: '닫기',
    };

    buttonContainer.appendChild(new Button(deleteButton));
    buttonContainer.appendChild(new Button(cancelButton));
    this.appendChild(buttonContainer);
  }
}

customElements.define('matzip-restaurant-detail', RestaurantDetail, {extends: 'div'});

export default RestaurantDetail;
