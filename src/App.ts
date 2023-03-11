import LunchHeader from './components/Header';
import Modal from './components/Modal';
import RestaurantItems from './components/RestaurantItems';
import SelectBox from './components/SelectBox';
import Tab from './components/Tab';

class App extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.innerHTML = `
      <lunch-header></lunch-header>
      <lunch-tab></lunch-tab>
      <select-box></select-box>
      <restaurant-items></restaurant-items>
      <add-modal></add-modal>
    `;
  }

  connectedCallback() {
    this.setLunchHeaderProps();
  }

  private setLunchHeaderProps() {
    const $lunchHeader = this.querySelector('lunch-header') as LunchHeader;

    const onModalButtonClick = () => {
      const $modal = this.querySelector('.modal');
      $modal?.classList.add('modal--open');
    };

    $lunchHeader.setProps({ onModalButtonClick });
  }
}

export default App;
