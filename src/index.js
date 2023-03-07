import '../style.css';
import RestaurantManager from './domain/RestaurantManager';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';
import { qs } from './utils/domHelpers';
import '../templates/add-button.png';

const restaurantManager = new RestaurantManager();
const header = new Header();
const main = new Main(restaurantManager);
const addModal = new AddModal(restaurantManager, main);

qs('.gnb').innerHTML = header.render();
qs('.restaurant-list').innerHTML = main.render();
qs('.modal').innerHTML = addModal.render();
