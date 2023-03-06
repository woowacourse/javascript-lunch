import Component from './Component';
import Header from './main/Header';
import Main from './main/Main';
import Modal from './main/Modal';

interface AppProps {}

interface AppState {
  modalShow: boolean;
}

class App extends Component<AppProps, AppState> {
  constructor($parent: DocumentFragment, props: AppProps) {
    super({
      $parent,
      props,
      tagName: 'div',
      initialState: { modalShow: false },
    });
  }

  appendChild() {
    const toggleModal = this.toggleModal.bind(this);

    new Header(this.$wrapper, { toggleModal });
    new Main(this.$wrapper, {});
    if (this.state.modalShow === true) {
      new Modal(this.$wrapper, { toggleModal });
    }
  }

  toggleModal() {
    this.setState({
      ...this.state,
      modalShow: !this.state.modalShow,
    });
  }
}

export default App;
