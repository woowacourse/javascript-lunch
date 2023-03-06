import Component from './Component';
import Modal from './Modal';
import Main from './Main';
import Header from './Header';

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
