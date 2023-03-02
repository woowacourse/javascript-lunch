import MainTemplate from './components/MainTemplate';
import Modal from './components/Modal';
import { Component } from './type';

type AppState = {
  modalHide: boolean;
};

type AppProps = {
  $parent: HTMLElement;
};

class App implements Component<AppState> {
  $component: HTMLElement;
  state: AppState;

  constructor({ $parent }: AppProps) {
    this.$component = document.createElement('div');
    this.$component.classList.add('app');
    $parent.append(this.$component);

    this.state = {
      modalHide: true,
    };
  }

  setState(newState: AppState) {
    this.state = newState;
    this.render();
  }

  render() {
    const { modalHide } = this.state;
    this.$component.innerHTML = ``;

    new MainTemplate({
      $parent: this.$component,
      initialState: this.state,
      toggleModal: this.toggleModal,
    }).render();

    if (modalHide === false) {
      new Modal({ $parent: this.$component, toggleModal: this.toggleModal }).render();
    }
  }

  toggleModal = () => {
    const { modalHide } = this.state;
    this.setState({
      ...this.state,
      modalHide: !modalHide,
    });
  };
}

export default App;
