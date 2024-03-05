import BaseComponent from './components/base/BaseComponent';

class App extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    this.innerHTML = `
    <matzip-gnb></matzip-gnb>
    <main>
      <matzip-filter-container></matzip-filter-container>
      <matzip-list-container></matzip-list-container>
      <matzip-modal></matzip-modal>
    </main>
    `;
  }
}

customElements.define('matzip-app', App);
