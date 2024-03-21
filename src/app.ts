import Matzip from './matzip';
import storage from './storage';
import LOCAL_STORAGE_KEY from './constants/LocalStorageKey';

const { MATZIP_DATA, FAVORITE_DATA } = LOCAL_STORAGE_KEY;

import Header from './components/header/Header';
import Tab from './components/tab/Tab';

class App extends HTMLElement {
  static matzip: Matzip;
  private main: HTMLElement;

  constructor() {
    super();
    App.matzip = new Matzip(storage.getData(MATZIP_DATA), storage.getData(FAVORITE_DATA));

    this.main = this.createMain();
    this.createHeader(this.main);
    this.createTab(this.main);
  }

  createHeader(main: HTMLElement) {
    const header = new Header(main);
    this.prepend(header);
  }

  createMain() {
    const main = document.createElement('main');
    this.appendChild(main);
    return main;
  }

  createTab(main: HTMLElement) {
    const tab = new Tab(['모든 음식점', '자주 가는 음식점'], main);
    this.main.prepend(tab);
  }
}

customElements.define('matzip-app', App);

export default App;
