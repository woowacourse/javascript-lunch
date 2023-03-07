import Component from './Component';
import Header from './main/Header';
import Main from './main/Main';
import Modal from './main/Modal';
import makeProxyObject from '../utils/makeProxyObject';

interface AppState {
  modalShow: boolean;
}

class App extends Component {
  state: AppState;

  constructor($parent: DocumentFragment) {
    super({ $parent, tagName: 'div', className: 'app' });
    this.state = makeProxyObject({ modalShow: false }, this.render.bind(this));
  }

  appendChild() {
    const toggleModal = this.toggleModal.bind(this);

    new Header(this.$wrapper, { toggleModal }).render();
    new Main(this.$wrapper).render();
    if (this.state.modalShow === true) {
      new Modal(this.$wrapper, { toggleModal }).render();
    }
  }

  toggleModal() {
    this.state.modalShow = !this.state.modalShow;
  }
}

export default App;
