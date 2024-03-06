import { RestaurantInfo } from '../../types';
import CategoryIcon from '../CategoryIcon';
import './style.css';

class RestaurantComponent {
  constructor(fragmentElement: DocumentFragment, info: RestaurantInfo) {
    this.#injectHTML(fragmentElement, info);
  }

  #injectHTML(fragmentElement: DocumentFragment, info: RestaurantInfo) {
    fragmentElement?.appendChild(this.#makeLiElement(info));
  }
  // TODO: 리팩토링으로 분리
  #makeLiElement(info: RestaurantInfo) {
    const iconHTML = CategoryIcon.getHTML(info.category);
    const html = `
    ${iconHTML}
    <div class="restaurant__info">
      <h3 class="restaurant__info__title">
       ${info.name}
      </h3>
      <p class="restaurant__info__distance"> 캠퍼스부터 ${info.distance}분 내</p>
      <p class="restaurant__info__explanation">
        ${info.description}
      </p>
    </div>
    `;

    const li = document.createElement('li');
    li.setAttribute('class', 'restaurant');
    li.innerHTML = html;
    li.addEventListener('click', () => {
      console.log('성공');
    });
    return li;
  }
}

export default RestaurantComponent;
