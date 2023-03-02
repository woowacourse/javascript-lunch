import { Component } from '../type';
import Header from './Header';
import RestaurantListPage from './RestaurantListPage';

type MainTemplateState = {
  modalHide: boolean;
};

type MainTemplateProps = {
  $parent: HTMLElement;
  initialState: MainTemplateState;
  toggleModal: () => void;
};

class MainTemplate implements Component<MainTemplateState> {
  $component: HTMLElement;
  state: MainTemplateState;
  toggleModal: () => void;

  constructor({ $parent, initialState, toggleModal }: MainTemplateProps) {
    this.$component = document.createElement('div');
    this.state = initialState;
    this.toggleModal = toggleModal;

    $parent.append(this.$component);
  }

  setState(newState: MainTemplateState) {
    this.state = newState;
    this.render();
  }

  render() {
    this.$component.innerHTML = ``;
    new Header({ $parent: this.$component, toggleModal: this.toggleModal }).render();
    new RestaurantListPage({ $parent: this.$component }).render();
    // TODO: 헤더, 음식 리스트 페이지
  }
}

export default MainTemplate;
