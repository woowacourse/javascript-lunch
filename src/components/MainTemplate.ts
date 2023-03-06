import type { Component } from '../type';
import Header from './Header';
import RestaurantListPage from './RestaurantListPage';

type MainTemplateState = {
  modalHide: boolean;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  modalHide: boolean;
  toggleModal: () => void;
};

class MainTemplate implements Component<MainTemplateState> {
  $component: HTMLElement;
  state: MainTemplateState;
  toggleModal: () => void;

  constructor({ $parent, modalHide, toggleModal }: MainTemplateProps) {
    this.$component = document.createElement('div');
    this.state = {
      modalHide,
    };
    this.toggleModal = toggleModal;

    $parent.append(this.$component);
  }

  setState = (newState: MainTemplateState) => {
    this.state = newState;
    this.render();
  };

  render = () => {
    this.$component.innerHTML = ``;
    new Header({ $parent: this.$component, toggleModal: this.toggleModal }).render();
    new RestaurantListPage({ $parent: this.$component }).render();
  };
}

export default MainTemplate;
