import '../style.css';
import RestaurantManager from './domain/RestaurantManager';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';
import { $ } from './utils/domHelpers';
import '../templates/add-button.png';

const restaurantManager = new RestaurantManager(localStorage);
const renderListData = restaurantManager.getRestaurantList();

const header = new Header();
const main = new Main(restaurantManager, addEvent);
const addModal = new AddModal(restaurantManager, main, addEvent);

$('.gnb').innerHTML = header.render();
$('.restaurant-list').innerHTML = main.render(renderListData, '전체', '이름순', false);
$('.modal').innerHTML = addModal.render();

function addEvent() {
  const SORT_DATA = {
    name: '이름순',
    distance: '거리순',
  };
  const category = $('select#category-filter option:checked').value;
  const sorts = $('select#sorting-filter option:checked').textContent;

  $('#render-filter').addEventListener('click', (e) => {
    if (e.target.className === 'render-unselected') {
      const reRenderData = restaurantManager.filterRestaurantLists(category, sorts);
      $('.render-selected').className = 'render-unselected';
      e.target.className = 'render-selected';
      if (e.target.id === 'favorite') {
        $('.restaurant-list').innerHTML = main.render(reRenderData, category, sorts, true);
        return addEvent();
      }
      $('.restaurant-list').innerHTML = main.render(reRenderData, category, sorts, false);
      return addEvent();
    }
  });

  $('#category-filter').addEventListener('change', (e) => {
    if (e.target.value === '전체') {
      const renderData = restaurantManager.getRestaurantList();
      $('.restaurant-list').innerHTML = main.render(
        renderData,
        '전체',
        sorts,
        $('.render-selected').id === 'favorite'
      );
      return addEvent();
    }
    const reRenderData = restaurantManager.filterRestaurantLists(e.target.value, sorts);
    $('.restaurant-list').innerHTML = main.render(
      reRenderData,
      e.target.value,
      sorts,
      $('.render-selected').id === 'favorite'
    );
    return addEvent();
  });

  $('#sorting-filter').addEventListener('change', (e) => {
    const reRenderData = restaurantManager.filterRestaurantLists(category, e.target.value);

    $('.restaurant-list').innerHTML = main.render(
      reRenderData,
      category,
      SORT_DATA[e.target.value],
      $('.render-selected').id === 'favorite'
    );

    return addEvent();
  });
}
addEvent();
