import './assets/css/main.css';
// import CategoryIcon from './components/CategoryIcon/index.ts';
import './components/CategoryIcon/style.css';
import DropBox from './components/DropBox/index.ts';
import TopBarAddBtn from './components/TopBarAddBtn/index.ts';
import { RestaurantListController } from './services/index.ts';

RestaurantListController.injectRestaurantListHTML();
new TopBarAddBtn();

const el = new DropBox(
  { label: '시험', name: '집에', id: '가고', class: '싶다' },
  ['소하', '바다', '끝'],
).dropBoxEl;

const g = document.querySelector('.dropbox-group');
g.appendChild(el);
