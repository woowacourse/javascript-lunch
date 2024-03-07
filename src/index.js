import Restaurants from './domains/Restaurants';

import Header from './components/Header';
import Main from './components/Main';
import Select from './components/Select';
import Restaurant from './components/Restaurant';
import RestaurantCreationModal from './components/RestaurantCreationModal';
import './styles/index.css';

// TODO: 상수화
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
const select = new Select(restaurants);
const restaurant = new Restaurant();
const modal = new RestaurantCreationModal(restaurants);

document.getElementById('header').innerHTML = header.render();
document.getElementById('main').innerHTML = main.render();
document.getElementById('restaurant-filter-container').appendChild(select.render(selectDatas[0]));
document.getElementById('restaurant-filter-container').appendChild(select.render(selectDatas[1]));
restaurants.standardList.forEach((restaurantData) => {
  document.getElementById('restaurant-list').innerHTML += restaurant.render(restaurantData);
});

document.getElementById('restaurant-creation-modal').innerHTML = modal.render();
