class App extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <matzip-gnb></matzip-gnb>
    <main>
      <matzip-divide></matzip-divide>
      <matzip-default-container>
        <matzip-filter-container></matzip-filter-container>
        <matzip-list-container></matzip-list-container>
      </matzip-default-container>
      <matzip-favorite-container></matzip-favorite-container>
      <matzip-modal></matzip-modal>
    </main>
    `;
  }
}

customElements.define('matzip-app', App);
