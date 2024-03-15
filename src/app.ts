class App extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
    <matzip-gnb></matzip-gnb>
    <main>
      <matzip-filter-container></matzip-filter-container>
    </main>
    `;
  }
}

customElements.define('matzip-app', App);
