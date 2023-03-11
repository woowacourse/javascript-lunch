import '../style.css';
import '../templates/add-button.png';
import { geid, qs } from './utils/domHelpers';

import Component from './Component.js';
import Header from './components/Header.js';
import RestaurantList from './components/RestaurantList.js';
import AddModal from './components/AddModal.js';
import Selector from './components/Selector';
import Favorite from './components/Favorite';
import FavoriteList from './components/FavoriteList';

class App extends Component {
  constructor() {
    super(geid('app'));

    new Header(qs('.gnb'));
    new Favorite(qs('.restaurant-favorite-container'));
    new Selector(qs('.restaurant-filter-container'));
    new RestaurantList(qs('.restaurant-list'));
    new FavoriteList(qs('.favorite-list'));
    new AddModal(qs('.modal'));
  }

  template() {
    return `
    <header class="gnb"></header>

    <section class="restaurant-favorite-container"></section>

    <section class="restaurant-filter-container"></section>

    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>

    <section class="favorite-list-container">
      <ul class="favorite-list"></ul>
    </section>

    <div class="modal"></div>
    `;
  }
}

new App();
