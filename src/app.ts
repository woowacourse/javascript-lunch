import Header from "./components/header/Header";
import Tab from "./components/tab/Tab";
import TabElementProps from "./components/tab/TabElementProps";

class App extends HTMLElement {
  private main: HTMLElement;
  private tab: Tab;
  private tabPane: HTMLElement;

  constructor() {
    super();
    this.createHeader();
    this.main = this.createMain();
    this.tab = this.createTab();
    this.tabPane = this.createTabpane();
  }
  
  createHeader() {
    const header = new Header();
    this.prepend(header);
  }

  createMain() {
    const main = document.createElement('main');
    this.appendChild(main);
    return main;
  }

  createTab() {
    const tabElementProps: TabElementProps[] = [
      { active: true, text: '모든 음식점' },
      { active: false, text: '자주 가는 음식점' }
    ];

    const tab = new Tab(tabElementProps);
    this.main.prepend(tab);
    return tab;
  }

  createTabpane() {
    const tabPane = document.createElement('section');
    tabPane.classList.add('tabpane');
    this.main.appendChild(tabPane);
    return tabPane;
  }

}

customElements.define('matzip-app', App);
