import '../style.css';
import '../templates/add-button.png';
import { geid, qs } from './utils/domHelpers';

import Component from './components/Component.js';
import Header from './components/Header.js';
import Main from './components/Main.js';
import AddModal from './components/AddModal.js';
import Selector from './components/Selector';

class App extends Component {
  constructor() {
    super(geid('app'));

    new Header(qs('.gnb'));
    new Selector(qs('.restaurant-filter-container'));
    new Main(qs('.restaurant-list'));
    new AddModal(qs('.modal'));
  }

  template() {
    return `
    <header class="gnb"></header>

    <section class="restaurant-filter-container"></section>

    <section class="restaurant-list-container">
      <ul class="restaurant-list"></ul>
    </section>

    <div class="modal"></div>
    `;
  }
}

new App();
