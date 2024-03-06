class App extends HTMLElement {
  constructor() {
    super();
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
