import korean from '../../templates/category-korean.png';
import chinese from '../../templates/category-chinese.png';
import japanese from '../../templates/category-japanese.png';
import western from '../../templates/category-western.png';
import asian from '../../templates/category-asian.png';
import etc from '../../templates/category-etc.png';

export default function RestaurantList($root, restaurants) {
  const $restaurantListSection = document.createElement('section');
  $restaurantListSection.className = 'restaurant-list-cotainer';

  this.state = {
    restaurantList: [],
  };

  this.init = () => {
    this.state.restaurantList = restaurants;
    this.render();

    $root.appendChild($restaurantListSection);
  };

  this.render = () => {
    $restaurantListSection.innerHTML = `
    <ul class="restaurant-list">
      ${this.state.restaurantList.reduce((html, restaurant) => {
        return html + RestaurantItemTemplate(restaurant.getRestaurantInfo());
      }, '')}
    </ul>
    `;
  };

  this.setState = (state) => {
    this.state = { ...this.state, ...state };
    this.render();
  };

  this.init();
}

function RestaurantItemTemplate({ category, distance, name, description }) {
  return `
    <li class="restaurant">
      <div class="restaurant__category">
        <img src="${categoryImageSource(
          category
        )}" alt="${category}" class="category-icon">
      </div>
      <div class="restaurant__info">
        <h3 class="restaurant__name text-subtitle">${name}</h3>
        <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 내</span>
        <p class="restaurant__description text-body">${description ?? ''}</p>
      </div>
    </li>`;
}

function categoryImageSource(category) {
  switch (category) {
    case '한식':
      return korean;
    case '중식':
      return chinese;
    case '일식':
      return japanese;
    case '양식':
      return western;
    case '아시안':
      return asian;
    case '기타':
      return etc;
  }
}
