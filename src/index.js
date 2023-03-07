import '../style.css';
import '../templates/add-button.png';
import { geid, qs } from './utils/domHelpers';

import Component from './components/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';

class App extends Component {
  constructor() {
    super(geid('app'));

    new Header(qs('.gnb'));
    new Main(qs('.restaurant-list'));
    new AddModal(qs('.modal'));
  }

  template() {
    return `
    <header class="gnb"></header>

    <section class="restaurant-filter-container">
      <select name="category" id="category-filter" class="restaurant-filter">
        <option value="전체">전체</option>
        <option value="한식">한식</option>
        <option value="중식">중식</option>
        <option value="일식">일식</option>
        <option value="양식">양식</option>
        <option value="아시안">아시안</option>
        <option value="기타">기타</option>
      </select>

      <select name="sorting" id="sorting-filter" class="restaurant-filter">
        <option value="name">이름순</option>
        <option value="distance">거리순</option>
      </select>
    </section>

    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>

    <div class="modal"></div>
    `;
  }
}

new App();
