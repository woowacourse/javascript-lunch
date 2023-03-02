import { $ } from './utils/dom';

const dummy = [
  {
    category: '한식',
    name: '맛이쪙 돈까스',
    distance: '10',
    description:
      '평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은',
    link: 'www.naver.com',
  },
  {
    category: '일식',
    name: '돈카라',
    distance: '5',
    description: '맛있어 맛있어',
    link: '',
  },
];

export default class App {
  #restaurants = [];

  constructor() {
    this.render();
  }

  getTemplate(restaurants) {
    const imgFileName = {
      한식: 'category-korean',
      중식: 'category-chinese',
      일식: 'category-japanese',
      아시안: 'category-asian',
      양식: 'category-western',
      기타: 'category-etc',
    };

    const template = `
      <ul class="restaurant-list">
      ${restaurants.reduce((html, restaurant) => {
        console.log(html);
        console.log(restaurant);
        return (
          html +
          `
        <li class="restaurant">
          <div class="restaurant__category">
            <img src="./img/${imgFileName[`${restaurant.category}`]}.png" alt="${
            restaurant.category
          }" class="category-icon" />
          </div>
          <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${restaurant.name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${
              restaurant.distance
            }분 내</span>
            <p class="restaurant__description text-body">${restaurant.description}</p>
          </div>
        </li>`
        );
      }, '')}
      </ul>`;

    return template;
  }

  render() {
    const template = this.getTemplate(dummy);

    $('.restaurant-list-container').innerHTML = template;
  }
}
