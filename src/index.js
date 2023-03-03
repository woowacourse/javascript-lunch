import '../style.css';
import RestaurantManager from './domain/RestaurantManager';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';
import { $ } from './utils/domHelpers';

const restaurantManager = new RestaurantManager();
const header = new Header();
const main = new Main(restaurantManager);
const addModal = new AddModal(restaurantManager, main);

$('.gnb').innerHTML = header.render();
$('.restaurant-list').innerHTML = main.render();
$('.modal').innerHTML = addModal.render();
