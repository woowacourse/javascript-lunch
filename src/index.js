import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Main from './components/Main';
import Select from './components/Select';
import Restaurant from './components/Restaurant';
import RestaurantCreationModal from './components/RestaurantCreationModal';
import './styles/index.css';

const selectDatas = [
  {
    id: 'sorting-filter',
    name: 'sorting',
    options: {
      name: '이름순',
      distance: '거리순',
    },
  },
  {
    id: 'category-filter',
    name: 'category',
    options: {
      전체: '전체',
      한식: '한식',
      중식: '중식',
      일식: '일식',
      양식: '양식',
      아시안: '아시안',
      기타: '기타',
    },
  },
];

// domain
const restaurants = new Restaurants(localStorage);

// components
const header = new Header();
const main = new Main();
const sortingSelect = new Select(selectDatas[0]);
const categorySelect = new Select(selectDatas[1]);
const restaurant = new Restaurant();
const modal = new RestaurantCreationModal(restaurants);

document.getElementById('header').innerHTML = header.render();
document.getElementById('main').innerHTML = main.render();
document.getElementById('restaurant-filter-container').appendChild(sortingSelect.render());
document.getElementById('restaurant-filter-container').appendChild(categorySelect.render());
restaurants.getStorageData.forEach((restaurantData) => {
  document.getElementById('restaurant-list').innerHTML += restaurant.render(restaurantData);
});
document.getElementById('restaurant-creation-modal').innerHTML = modal.render();
