import RestaurantItem from './RestaurantItem.js';
import { $ } from '../utils/domHelpers.js';
import { RESTAURANT_IMAGE } from '../constants/images.ts';

class Main {
  #restaurant;
  #restaurantManager;
  #renderEvent;

  constructor(restaurantManager, renderEvent) {
    this.#restaurant = new RestaurantItem(RESTAURANT_IMAGE, restaurantManager);
    this.#restaurantManager = restaurantManager;
    this.#renderEvent = renderEvent;
    this.closeModal();
  }

  render(data, selected, sortby, favorite) {
    const FAVORITE_TEMPLATE = {
      true: `<div id="render-filter">
      <button class="render-unselected" type="button">모든 음식점</button>
      <button class="render-selected" id="favorite" type="button">자주 가는 음식점</button>
    </div>`,
      false: `<div id="render-filter">
      <button class="render-selected" type="button">모든 음식점</button>
      <button class="render-unselected" id="favorite" type="button">자주 가는 음식점</button>
    </div>`,
    };

    return `
    ${FAVORITE_TEMPLATE[favorite]}
    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체" ${'전체' === selected ? 'selected' : '!selected'}>전체</option>
          <option value="한식" ${'한식' === selected ? 'selected' : '!selected'}>한식</option>
          <option value="중식" ${'중식' === selected ? 'selected' : '!selected'}>중식</option>
          <option value="일식" ${'일식' === selected ? 'selected' : '!selected'}>일식</option>
          <option value="양식" ${'양식' === selected ? 'selected' : '!selected'}>양식</option>
          <option value="아시안" ${'아시안' === selected ? 'selected' : '!selected'}>아시안</option>
          <option value="기타" ${'기타' === selected ? 'selected' : '!selected'}>기타</option>
        </select>
      
        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name" ${'이름순' === sortby ? 'selected' : '!selected'}>이름순</option>
          <option value="distance" ${'거리순' === sortby ? 'selected' : '!selected'}>거리순</option>
        </select>
      </section>
    ${
      favorite
        ? this.#restaurantManager.getFavoriteList().reduce((acc, element, key) => {
            acc += this.#restaurant.render(element, `key${key}`);
            return acc;
          }, '')
        : this.#restaurantManager.refreshData(data).reduce((acc, element, key) => {
            acc += this.#restaurant.render(element, `key${key}`);
            return acc;
          }, '')
    }
    `;
  }

  closeModal() {
    $('.information-modal--close').addEventListener('click', (e) => {
      const category = $('select#category-filter option:checked').value;
      const sorts = $('select#sorting-filter option:checked').textContent;

      if (e.target.textContent === '닫기') {
        $('.information-modal--open').className = 'information-modal--close';
      } else if (e.target.textContent === '삭제하기') {
        const removeData = $('#storeName').textContent;
        this.#restaurantManager.removeRestaurant(removeData);
        $('.information-modal--open').className = 'information-modal--close';
        $('.restaurant-list').innerHTML = this.render(
          this.#restaurantManager.getRestaurantList(),
          category,
          sorts,
          $('.render-selected').textContent === '자주 가는 음식점'
        );
        this.closeModal();
        this.#renderEvent();
      } else if (e.target.tagName === 'IMG' && e.target.className === 'category-filled') {
        alert('즐겨찾기가 해제되었습니다.');
        $('.information-modal--open').className = 'information-modal--close';
        const removeFavorite = $('#storeName').textContent;
        this.#restaurantManager.reverseFavorite(removeFavorite);
        $('.restaurant-list').innerHTML = this.render(
          this.#restaurantManager.getRestaurantList(),
          category,
          sorts,
          $('.render-selected').textContent === '자주 가는 음식점'
        );
        this.closeModal();
        this.#renderEvent();
      } else if (e.target.tagName === 'IMG' && e.target.className === 'category-lined') {
        alert('즐겨찾기가 추가되었습니다.');
        $('.information-modal--open').className = 'information-modal--close';
        const removeFavorite = $('#storeName').textContent;
        this.#restaurantManager.reverseFavorite(removeFavorite);
        $('.restaurant-list').innerHTML = this.render(
          this.#restaurantManager.getRestaurantList(),
          category,
          sorts,
          $('.render-selected').textContent === '자주 가는 음식점'
        );
        this.closeModal();
        this.#renderEvent();
      }
    });
  }
}

export default Main;
